<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
            'en.title' => 'required|string|max:255',
            'en.description' => 'nullable|string',
            'en.estimated_duration' => 'required|integer|min:1',
            'en.content' => 'required|array',

            'fr.title' => 'required|string|max:255',
            'fr.description' => 'nullable|string',
            'fr.estimated_duration' => 'required|integer|min:1',
            'fr.content' => 'required|array',

            'ar.title' => 'required|string|max:255',
            'ar.description' => 'nullable|string',
            'ar.estimated_duration' => 'required|integer|min:1',
            'ar.content' => 'required|array',

            'published' => 'boolean',
            'enable_certificate' => 'boolean',
            'enable_discussion' => 'boolean',
            'course_id' => 'required|integer',
        ]);

        // dd($request->course_id);
        Chapter::create([
            'title' => [
                'en' => $request->input('en.title'),
                'fr' => $request->input('fr.title'),
                'ar' => $request->input('ar.title'),
            ],
            'description' => [
                'en' => $request->input('en.description'),
                'fr' => $request->input('fr.description'),
                'ar' => $request->input('ar.description'),
            ],
            'estimated_duration' => [
                'en' => $request->input('en.estimated_duration'),
                'fr' => $request->input('fr.estimated_duration'),
                'ar' => $request->input('ar.estimated_duration'),
            ],
            'published' => $request->boolean('published'),
            'enable_certificate' => $request->boolean('enable_certificate'),
            'enable_discussion' => $request->boolean('enable_discussion'),
            'content' => [
                'en' => $request->input('en.content'),
                'fr' => $request->input('fr.content'),
                'ar' => $request->input('ar.content'),
            ],
            'course_id' => $request->course_id,
        ]);

        // dd($request);
        // use Illuminate\Support\Str;

        if ($request->file()) {
            foreach (['en', 'fr', 'ar'] as $locale) {
                $blocks = $request->file("$locale.content.0.blocks");

                if (!is_array($blocks)) {
                    continue; // Skip if no blocks
                }

                foreach ($blocks as $block) {
                    if (isset($block['content']['file']) && $block['content']['file'] instanceof \Illuminate\Http\UploadedFile) {
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
        }

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully!');
    }

    public function readChapters(Request $request)
    {
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
        return Inertia::render('courses/admin/chapter/[id]', [
            'chapter' => $chapter,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chapter $chapter)
    {
        // only select what i need instead of sending whole collection
        $chapters = Chapter::select('id', 'title', 'content')->get();
        $courses = Course::select('id', 'name')->with('chapters')->get();
        return Inertia::render('courses/admin/chapter/[id]', [
            'chapter' => $chapter,
            'chapters' => $chapters,
            'courses' => $courses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chapter $chapter)
    {
        // dd($request);
        $request->validate([
            'title' => 'required|array',
            'description' => 'required|array',
            'estimated_duration' => 'required|array',
            'content' => 'required|array',
            'content.en' => 'sometimes|array',
            'content.ar' => 'sometimes|array',
            'content.fr' => 'sometimes|array',
            'content.*.*.blocks' => 'required|array',
            'content.*.*.blocks.*.id' => 'required|string',
            'content.*.*.blocks.*.type' => 'required|string',
        ]);
        if ($request->file()) {
            foreach (['en', 'fr', 'ar'] as $locale) {
                $blocks = $request->file("content.$locale.0.blocks");
                // dd($blocks);

                if (!is_array($blocks)) {
                    continue; // Skip if no blocks
                }
                foreach ($blocks as $block) {
                    if (isset($block['content']['file']) && $block['content']['file'] instanceof \Illuminate\Http\UploadedFile) {
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
        }

        $chapter->update([
            'title' => $request->title,
            'description' => $request->description,
            'estimated_duration' => $request->estimated_duration,
            'content' => $request->content
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chapter $chapter)
    {
        foreach ($chapter->content as $locale) {
            $blocks = $locale[0]['blocks'];
            foreach ($blocks as $block) {
                if ($block['type'] === 'image' || $block['type'] === 'document') {
                    Storage::disk("public")->delete($block['content']['url']);
                }
            }
        }
        $chapter->delete();
    }

    public function shareBlock(Request $request)
    {
        $validated = $request->validate([
            'chapter_id' => 'required',
            'language' => 'required',
            'block' => 'required|array',
        ]);

        $chapter = Chapter::findOrFail($validated['chapter_id']);
        $content = $chapter->content;

        // Ensure content is an array
        if (is_string($content)) {
            $content = json_decode($content, true);
        }

        $lang = $validated['language'];
        $block = $validated['block'];
        $content[$lang][0]['blocks'][] = $block;
        $chapter->content = $content;
        $chapter->save();
    }

    // public function deleteBlock(Chapter $chapter)
    // {
    //     foreach ($chapter->content as $locale) {
    //         $blocks = $locale[0]['blocks'];
    //         foreach ($blocks as $block) {
    //             if ($block['type'] === 'image' || $block['type'] === 'document') {
    //                 Storage::disk("public")->delete($block['content']['url']);
    //             }
    //         }
    //     }
    //     // $chapter->delete();
    // }
}
