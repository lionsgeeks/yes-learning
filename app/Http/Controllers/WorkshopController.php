<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\SubWorkshop;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        return Inertia::render("workshops/admin/index" , [
            "workshops" => Workshop::with('course')->get(),
            'courses' => Course::all(),
        ]);
    }


    public function studentIndex()
    {
        $userId = Auth::id();
        return Inertia::render("workshops/student/index",[
            "workshops" => SubWorkshop::with('chapter')->with("users:id")->get()->map(function($subworkshop) use ($userId) {
                $subworkshop->enrolled = $subworkshop->users->contains("id", $userId); // zdt value jdid fl subw$subworkshops  li howa  enrolled  bach n3rf wh l user  m enrolli ola la
                $subworkshop->enrolledCount = $subworkshop->users()->count();
                unset($subworkshop->users);
                return $subworkshop;
            }),
            'chapters' => Chapter::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validated = $request->validate([
            'name' => 'required|array',
            "name.en"=>"required|string",
            "name.fr"=>"required|string",
            "name.ar"=>"required|string",
            'description' => 'required|array',
            "description.en"=>"required|string",
            "description.descriptionfr"=>"required|string",
            "description.descriptionar"=>"required|string",
            "course_id"=>"required"
        ]);
        Workshop::create([
            "name" => json_encode($validated['name']),
            "description" => json_encode($validated['description']),
            'course_id' => $validated['course_id'],
            'isComplete' => 0,
        ]);

        return back()->with('success', 'workshop created successfully!');

    }

    /**
     * Display the specified resource.
     */
    public function show(Workshop $workshop)
    {
        //


        return Inertia::render("workshops/admin/[id]", [
            'workshop' => $workshop->load('course'),
            'subWorkshops'=>SubWorkshop::with('users')->get(),
            'chapters' => Chapter::all(),
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workshop $workshop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workshop $workshop)
    {

        $workshop->update([
            'name' => json_encode($request->name),
            'description' => json_encode($request->description),
            'course_id' => $request->course_id,
            'isComplete' => false,
        ]);

        return back()->with('success', 'Workshop updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workshop $workshop)
    {
        //
        $workshop->delete();
        return redirect("/admin/workshops");
    }
}
