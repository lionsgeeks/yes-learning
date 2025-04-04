<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\SubWorkshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SubWorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:400',
            "chapter_id"=>"required",
            "prerequisite"=>"required",
            "date"=>"required",
            "time"=>"required",
            "duration"=>"required",
            "instructor"=>"required|array",
            "instructor.instructoren"=>"required|string",
            "instructor.instructorfr"=>"required|string",
            "instructor.instructorar"=>"required|string",
            'meetLink' => 'required|array',
            'meetLink.meetlinken' => 'required|string',
            'meetLink.meetlinkfr' => 'required|string',
            'meetLink.meetlinkar' => 'required|string',
            "allowQuestions"=>"required",
            "requireRegistration"=>"required",
            "sendNotifications"=>"required",
            "published"=>"required"
        ]);
        // dd($request->all());
        SubWorkshop::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'chapter_id' => $validated['chapter_id'],
            'workshop_id' => $request->workshop_id,
            "prerequisite"=>$validated['prerequisite'],
            "date"=>$validated['date'],
            "time"=>$validated['time'],
            "duration"=>$validated['duration'],
            "instructor"=>json_encode($validated['instructor']),
            "meetLink" => json_encode($validated['meetLink']),
            "allowQuestions"=>$validated['allowQuestions'],
            "requireRegistration"=>$validated['requireRegistration'],
            "sendNotifications"=>$validated['sendNotifications'],
            "published"=>$validated['published']
        ]);

        return back();

    }

    /**
     * Display the specified resource.
     */
    public function show(SubWorkshop $subWorkshop)
    {
        //
        return Inertia::render("workshops/admin/[subid]", [
            "subWorkshop" => $subWorkshop->load('users'),
            'chapters' => Chapter::all(),
        ]);
    }

    public function enroll(SubWorkshop $subWorkshop)
    {
        
        $subWorkshop->users()->toggle(Auth::id()); //  b7al toggle ta3 javascript  

        return redirect("/workshop");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubWorkshop $subWorkshop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubWorkshop $subWorkshop)
    {
  
    
        $subWorkshop->update([
            'name' => $request->name,
            'description' => $request->description,
            'chapter_id' => $request->chapter_id,
            'workshop_id' => $request->workshop_id, 
            'prerequisite' => $request->prerequisite,
            'date' => $request->date,
            'time' => $request->time,
            'duration' => $request->duration,
            'instructor' => json_encode($request->instructor),
            'meetLink' => json_encode($request->meetLink),
            'allowQuestions' => $request->allowQuestions,
            'requireRegistration' => $request->requireRegistration,
            'sendNotifications' => $request->sendNotifications,
            'published' => $request->published,
        ]);
    
        return back();
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubWorkshop $subWorkshop)
    {
        //
        $subWorkshop->delete();
        return redirect(route("workshops.show" , $subWorkshop->workshop_id));
    }
}
