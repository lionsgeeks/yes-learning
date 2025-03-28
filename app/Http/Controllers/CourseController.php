<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $userId = Auth::id(); // hna khdit l id  ta3 l auth user
        return Inertia::render("courses/student/index", [
            "courses" => Course::with("users:id")->get()->map(function ($course) use ($userId) { // mappit 3la ga3 l courses  o 3ayat m3ahom 3la l users  o 3ayat ghi 3la l id dyal l user  li 
                //an7tajo bach n9arn  wach m enrolli fl course to avoid loading data li mam7tajhach
                $course->enrolled = $course->users->contains("id", $userId); // zdt value jdid fl courses  li howa  enrolled  bach n3rf wh l user  m enrolli ola la 
                $course->enrolledCount = $course->users()->count();
                unset($course->users); // hna 9bel mansift data  unlinkit l relation bach matmchich l  front  ( makayn lach  tmchi 7it lgharad  howa  n9ad kolchi  fl backend)
                return $course; //  akhiran  had l3ayba o l3ziz 3la amimto 3mro maytkhas
            })
        ]);
    }


    public function adminIndex()
    {
        //
        $courses = Course::all()->map(function ($course) {
            $course->image = asset('storage/' . $course->image); // Using asset() to generate the full URL
            return $course;
        });

        return Inertia::render('courses/admin/index', [
            'courses' => $courses,
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
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'label' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:3072',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('image/courses', 'public');
        }

        $course = Course::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'label' => $validated['label'],
            'image' => $imagePath,
        ]);
        // Return a response
        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
        return Inertia::render("courses/student/[id]", [
            "course" => $course,
            "image_url" => asset('storage/'),
            "chapters" => Chapter::where("course_id", $course->id)
                ->with(['users' => function ($query) {
                    $query->select('users.id');
                }])
                ->get()
                ->map(function ($chapter) {
                    $chapter->content = json_decode($chapter->content, true);
                    return $chapter;
                }),
        ]);
    }
    public function adminShow(Course $course)
    {
        //

        $course->image = asset('storage/' . $course->image);


        return Inertia::render("courses/admin/[id]", [
            "course" => $course->load("users"),
            "modules" => Chapter::where("course_id", $course->id)->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }


    public function enroll(Course $course)
    {

        $course->users()->toggle(Auth::id()); //  b7al toggle ta3 javascript  

        return redirect("/course");
    }
}
