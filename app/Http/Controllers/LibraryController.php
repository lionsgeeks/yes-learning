<?php

namespace App\Http\Controllers;

use App\Models\Filelibrary;
use App\Models\Library;
use App\Models\Sublibrary;
use App\Models\SubWorkshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function index()
    {
        $lang = Auth::user()->language;

        $libraries = Library::all()->map(function ($library) use ($lang) {
            return [
                'id' => $library->id,
                'title' => $library->title[$lang] ?? $library->title['en'],
            ];
        });

        return Inertia::render('libraries/student/index', [
            'libraries' => $libraries
        ]);
    }


    public function showSubLibrary(Sublibrary $sublibrary)
    {
        return Inertia::render('libraries/student/[id]', [
            'sublibrary' => $sublibrary->load('filelibraries')
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'workshop' => 'required',
        ]);
        $subworkshop = SubWorkshop::where('id', $validated['workshop'])->with('workshop')->first();
        $libraryTitle = [
            'en' => $subworkshop->name['en'] . 'library',
            'fr' => 'Bibliothèque' . $subworkshop->name['fr'],
            'ar' => $subworkshop->name['ar'] . ' مكتبة',
        ];

        $library = Library::create([
            'title' => $libraryTitle,
        ]);
        // dd($library->id);
        foreach (["en", "fr", "ar"] as $key => $value) {
            Sublibrary::create([
                'title' => $library->title[$value],
                'coach' => $subworkshop->instructor[$value],
                'library_id' => $library->id
            ]);
        }
    }
    public function update(Request $request, Library $library)
    {
        // dd($request);
        $validated = $request->validate([
            'title' => 'required|array',
            'title.en' => 'required|string|max:255',
            'title.fr' => 'nullable|string|max:255',
            'title.ar' => 'nullable|string|max:255',
        ]);

        $library->update([
            'title' => $validated['title'],
        ]);


        return redirect()->back()->with('success', 'Library updated successfully');
    }

    public function showLibrary(Library $library)
    {
        // dd($library);
        return Inertia::render('libraries/student/subLibraries', [
            'library' => $library->load('sublibraries')
        ]);
    }

    public function adminLibraries()
    {
        $libraries = Library::with('sublibraries.filelibraries')->get();
        return Inertia::render('libraries/admin/index', [
            'libraries' => $libraries
        ]);
    }
    public function createLibrary()
    {
        return Inertia::render('libraries/admin/createLibrary');
    }
    public function createSubLibrary()
    {
        return Inertia::render('libraries/admin/subLibrary');
    }
    public function destroy(Library $library)
    {
        $sublibraries = Sublibrary::where('library_id', $library->id)->get();
        foreach ($sublibraries as $sub) {
            $docs = Filelibrary::where('sublibrary_id', $sub->id)->get();
            foreach ($docs as $doc) {
                Storage::disk('public')->delete($doc->path);
            }
        }
        $library->delete();
        return redirect()->back()->with('success', 'Library and all its sub-libraries deleted successfully');
    }
}
