<?php

namespace App\Http\Controllers;

use App\Models\Filelibrary;
use App\Models\Sublibrary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SublibraryController extends Controller
{
    public function index()
    {
        //
    }
    public function update(Request $request, Sublibrary $sublibrary)
    {
        // dd($request);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'coach' => 'required|string|max:255',
            'link' => 'required|string|max:255',
        ]);

        $sublibrary->update(
            [
                'title' => $validated['title'],
                'coach' => $validated['coach'],
                'link' => $validated['link']
            ]
        );
        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $fileName = $file->getClientOriginalName();
                $path = $file->store("libraries/documents", 'public');
                Filelibrary::create([
                    'name' => $fileName,
                    'path' => $path,
                    'sublibrary_id' => $sublibrary->id,
                ]);
            }
        }


        return redirect()->back()->with('success', 'Sub-library updated successfully');
    }
    public function destroy(Sublibrary $sublibrary)
    {
        $documents = Filelibrary::where('sublibrary_id', $sublibrary->id)->get();
        if ($documents) {
            foreach ($documents as $doc) {
                Storage::disk('public')->delete($doc->path);
            }
            $sublibrary->delete();
        }
        return redirect()->back()->with('success', 'Sub-library deleted successfully');
    }

    public function deleteFile(Filelibrary $filelibrary)
    {
        // dd($filelibrary);
        if (Storage::disk('public')->exists($filelibrary->path)) {
            Storage::disk('public')->delete($filelibrary->path);
        }
        $filelibrary->delete();
    }
}
