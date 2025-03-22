<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render("courses/student/index",);
    }
    public function adminIndex()
    {        
        //
        $courses = Course::all()->map(function($course) {
            $course->image = asset('storage/'.$course->image); // Using asset() to generate the full URL
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
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:3072',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('image/courses', 'public');
        }

        $course = Course::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
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
            "course" => $course
        ]);
    }
    public function adminShow(Course $course)
    {
        //
        return Inertia::render("courses/admin/[id]", [
            "course" => $course
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
}
