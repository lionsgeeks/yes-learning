<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
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
        return Inertia::render("courses/admin/chapter/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'estimated_duration' => 'required|integer|min:1',
            'published' => 'boolean',
            'enable_certificate' => 'boolean',
            'discussion' => 'boolean',
            'content' => 'required|array',
            'course_id' => 'nullable',
            // 'course_id' => 'nullable|exists:quizzes,id',
        ]);
        
        // $block = $reaquest
        Chapter::create([
            'title' => $request->title,
            'description' => $request->description,
            'estimated_duration' => $request->estimated_duration,
            'published' => $request->published ?? false,
            'enable_certificate' => $request->enable_certificate ?? true,
            'enable_discussion' => $request->discussion ?? false,
            'content' => json_encode($request->content),
            'course_id' => $request->course_id,
        ]);
        if ($request->file()) {
            $file = $request->file('content.0.blocks.0.content.file');
            $fileName = $file->getClientOriginalName();
            $file->storeAs('image/chapters', $fileName, 'public');
            // dd($fileName);
        }
        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chapter $chapter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chapter $chapter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chapter $chapter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chapter $chapter)
    {
        //
    }
}
