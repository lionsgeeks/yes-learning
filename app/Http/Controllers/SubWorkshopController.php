<?php

namespace App\Http\Controllers;

use App\Mail\MeetingNotification;
use App\Models\Chapter;
use App\Models\SubWorkshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
            'name' => 'required|array',
            "name.en"=>"required|string",
            "name.fr"=>"required|string",
            "name.ar"=>"required|string",
            'description' => 'required|array',
            "description.en"=>"required|string",
            "description.fr"=>"required|string",
            "description.fr"=>"required|string",
            "chapter_id"=>"required",
            "prerequisite"=>"required|array",
            "prerequisite.en"=>"required|string",
            "prerequisite.fr"=>"required|string",
            "prerequisite.ar"=>"required|string",
            "date"=>"required",
            "time"=>"required",
            "duration"=>"required",
            "instructor"=>"required|array",
            "instructor.en"=>"required|string",
            "instructor.fr"=>"required|string",
            "instructor.ar"=>"required|string",
            'meetLink' => 'required|array',
            'meetLink.en' => 'required|string',
            'meetLink.fr' => 'required|string',
            'meetLink.ar' => 'required|string',
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
            "prerequisite"=> $validated['prerequisite'],
            "date"=>$validated['date'],
            "time"=>$validated['time'],
            "duration"=>$validated['duration'],
            "instructor"=>$validated['instructor'],
            "meetLink" => $validated['meetLink'],
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




    public function sendnotification(SubWorkshop $subWorkshop){
        $sub = SubWorkshop::where("id", $subWorkshop->id)->with('users')->first();

    foreach ($sub->users as $user) {
        $email = $user->email;
        // $email = "aymenboujjar12@gmail.com";
        $language = $user->language;

        $meetLinks = json_decode($sub->meetLink);
        $meetLink = $meetLinks->$language ?? null;


            Mail::to($email)->send(new MeetingNotification($email, $meetLink , $language));

    }
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
            'name' => json_encode($request->name),
            'description' => json_encode($request->description),
            'chapter_id' => $request->chapter_id,
            'workshop_id' => $request->workshop_id,
            'prerequisite' => json_encode($request->prerequisite),
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
