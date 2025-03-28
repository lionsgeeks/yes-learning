<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
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
            'quizTitle' => 'required',
            'quizDescription' => 'required',
            'quizTime' => 'required',
            'questions' => 'required',
        ]);

        $chapter = Chapter::create([
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
            $blocks = $request->file('content.0.blocks');
            foreach ($blocks as $block) {
                if (isset($block['content']['file'])) {
                    $file = $block['content']['file'];
                    $fileName = $file->getClientOriginalName();
                    if (Str::contains($file->getMimeType(), 'application')) {
                        $file->storeAs('documents/chapters', $fileName, 'public');
                    } else {
                        $file->storeAs('image/chapters', $fileName, 'public');
                    }
                }
            }
        }

        // calling the quizcontroller to use the store function
        $quizController = new QuizController();
        $quizController->store($request, $chapter);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully!');
    }

    public function readChapters(Request $request) {
        $request->validate([
            'user_id' => 'required',
            'chapter_id' => 'required'
        ]);
        if (!DB::table('chapter_users')->where('user_id', $request->user_id)->where('chapter_id', $request->chapter_id)->exists()) {
            $user = User::find($request->user_id);
            $user->chapters()->attach($request->chapter_id);
        }
        return back();
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
