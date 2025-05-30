<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Quiz;
use App\Models\SubWorkshop;
use App\Models\UserSubWorkshop;
use App\Models\Workshop;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use ReflectionClass;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $userId = Auth::id(); // hna khdit l id  ta3 l auth user
        $userLang = Auth::user()->language;
        return Inertia::render("courses/student/index", [
            "courses" => Course::with("users:id")->where('published', true)->get()->map(function ($course) use ($userId, $userLang) { // mappit 3la ga3 l courses  o 3ayat m3ahom 3la l users  o 3ayat ghi 3la l id dyal l user  li
                //an7tajo bach n9arn  wach m enrolli fl course to avoid loading data li mam7tajhach
                $course->name = $course->name[$userLang];
                $course->description = $course->description[$userLang];
                $course->label = $course->label[$userLang];
                $course->enrolled = $course->users->contains("id", $userId); // zdt value jdid fl courses  li howa  enrolled  bach n3rf wh l user  m enrolli ola la
                $course->enrolledCount = $course->users()->count();
                // get the duration of course based on the sum of the chapters
                $course->duration = $course->chapters->sum(function ($chapter) use ($userLang) {
                    return $chapter->estimated_duration[$userLang] ?? 0;
                });
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
        $validated = $request->validate([
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.fr' => 'required|string|max:255',
            'name.ar' => 'required|string|max:255',

            'description' => 'required|array',
            'description.en' => 'required|string',
            'description.fr' => 'required|string',
            'description.ar' => 'required|string',

            'label' => 'required|array',
            'label.en' => 'required|string',
            'label.fr' => 'required|string',
            'label.ar' => 'required|string',
            'published' => 'required|boolean',
            'image' => 'required|image|mimes:jpeg,png,jpg,svg|max:3072',
        ]);
        // dd($request);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('image/courses', 'public');
        }

        Course::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'label' => $validated['label'],
            'published' => $validated['published'],
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
        $lang = Auth::user()->language;
        $quizId = $course->quiz()?->first()?->id;
        $workshops = Workshop::where('course_id', $course->id)->first();

        if ($workshops) {

            $subworkshops = SubWorkshop::where('workshop_id', $workshops->id)->get();

            foreach ($subworkshops as $sub) {
                UserSubWorkshop::updateOrCreate(
                    [
                        'user_id' => Auth::id(),
                        'sub_workshop_id' => $sub->id,
                    ],
                );
            }
        };
        $chapters = Chapter::where("course_id", $course->id)
                            ->with(['users' => function ($query) {
                    $query->select('users.id');
                }])
                ->get()
                ->map(function ($chapter) use ($lang) {
                    $chapter->title = $chapter->title[$lang];
                    $chapter->description = $chapter->description[$lang];
                    $chapter->estimated_duration = $chapter->estimated_duration[$lang];
                    $chapter->content = $chapter->content[$lang] ?? null;
                    return $chapter;
                });
                // dd($chapters);



        return Inertia::render("courses/student/[id]", [
            "course" => [
                'id' => $course->id,
                'name' => $course->name[$lang],
                'description' => $course->description[$lang],
                'label' =>  $course->label[$lang],
            ],
            "quizId" => $quizId,
            "chapters" => $chapters,

        ]);
    }
    public function adminShow(Course $course)
    {
        $course->image = asset('storage/' . $course->image);
        $courseQuiz = Quiz::where('course_id', $course->id)->with('questions')->first();

        $quizQuestions = $courseQuiz?->questions->map(function ($question) {
            return [
                'id' => $question->id,
                'type' => $question->type,
                'text' => json_decode($question->question, true),
                'options' => json_decode($question->options, true),
                'allow_multiple' => $question->allow_multiple,
                'correct_answer' => json_decode($question->correct_answer),
            ];
        });

        $quizData = $courseQuiz ? [
            'id' => $courseQuiz->id,
            'title' => $courseQuiz->title,
            'description' => $courseQuiz->description,
            'time' => $courseQuiz->time_limit,
            'publish' => $courseQuiz->published,
            'questions' => $quizQuestions,
        ] : null;

        return Inertia::render("courses/admin/[id]", [
            "course" => $course->load("users"),
            "modules" => Chapter::where("course_id", $course->id)->get(),
            "courseQuiz" => $quizData,
        ]);
    }

    /**
     * update the form for editing the specified resource.
     */
    public function update(Request $request, Course $course)
    {
        // dd($request);
        $validated = $request->validate([
            'name' => 'required|array',
            'name.en' => 'required|string|max:255',
            'name.fr' => 'required|string|max:255',
            'name.ar' => 'required|string|max:255',
            'description' => 'required|array',
            'description.en' => 'required|string',
            'description.fr' => 'required|string',
            'description.ar' => 'required|string',
            'label' => 'required|array',
            'label.en' => 'required|string',
            'label.fr' => 'required|string',
            'label.ar' => 'required|string',
            'published' => 'required|boolean',
            'image' => 'required',
        ]);
        // dd($course);
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('image/courses', 'public');
        }
        if ($imagePath) {

            $course->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'label' => $validated['label'],
                'published' => $validated['published'],
                'image' =>  $imagePath,
            ]);
        } else {
            $course->update([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'label' => $validated['label'],
                'published' => $validated['published'],
            ]);
        }
    }
    /**
     * Preview the course.
     */
    public function preview(Course $course)
    {
        return Inertia::render('courses/admin/preview', [
            'course' => $course,
            'chapters' => Chapter::where('course_id', $course->id)->get(),
        ]);
    }

    /**
     * edit the specified resource in storage.
     */
    public function edit(Course $course) {}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        Storage::disk("public")->delete($course->image);
        $course->delete();
    }


    public function enroll(Course $course)
    {
        $workshops = Workshop::where('course_id', $course->id)->get();
        $course->users()->toggle(Auth::id());
        $allSubworkshops = collect();

        foreach ($workshops as $workshop) {
            $subworkshops = SubWorkshop::where('workshop_id', $workshop->id)->get();
            $allSubworkshops = $allSubworkshops->merge($subworkshops);
        }

        // dd($allSubworkshops);

        $subworkshopcontroller = new SubWorkshopController;


        foreach ($allSubworkshops as $onesub) {

            $subworkshopcontroller->enroll($onesub);
        }



        return redirect("/course");
    }
}
