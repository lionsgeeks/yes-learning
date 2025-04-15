<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizUser;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("quiz/index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("quiz/createQuiz");
    }

    /**
     * Store a newly created resource in storage.
     */
    // function works but can reduce repition :/
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quizTitle' => 'required',
            'quizTitle.en' => 'required',
            'quizTitle.fr' => 'required',
            'quizTitle.ar' => 'required',
            'quizDescription' => 'required',
            'quizDescription.en' => 'required',
            'quizDescription.fr' => 'required',
            'quizDescription.ar' => 'required',
            'quizTime' => 'required',
        ]);

        $quizData = [
            'title' => json_encode($validated['quizTitle']),
            'description' => json_encode($validated['quizDescription']),
            'time_limit' => $request->quizTime,
            'published' => $request->quizPublish,
            'course_id' => $request->course_id,
        ];

        $quiz = Quiz::updateOrCreate(
            ['course_id' => $request->course_id],
            $quizData
        );

        $existingIds = $quiz->questions->pluck('id')->toArray();

        foreach ($request->questions as $quest) {

            // if question id already exists then skip and move to the next question
            if (!empty($quest['id']) && in_array($quest['id'], $existingIds)) {
                continue;
            }

            $options = isset($quest['options'])
                ? json_encode(array_map(fn($item) => Arr::except($item, ['id']), $quest['options']))
                : null;

            Question::create([
                'quiz_id' => $quiz->id,
                'type' => $quest['type'],
                'question' => json_encode($quest['text']),
                'options' => $options,
                'allow_multiple' => $quest['allow_multiple'] ?? null,
                'correct_answer' => isset($quest['correct_answer'])  ? json_encode($quest['correct_answer']) : null,
            ]);
        }

        return redirect()->route('admin.courses.index')->with('success', 'Quiz created successfully!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        $user = Auth::user();
        $lang = $user->language;

        $quizData = [
            'id' => $quiz->id,
            'title' => json_decode($quiz->title)->$lang,
            'description' => json_decode($quiz->description)->$lang,
            'timeLimit' => $quiz->time_limit,
            'passingScore' => 70,
            'course_id' => $quiz->course_id,
            'questions' => $quiz->questions()->get()->map(function ($question) use ($lang) {

                return [
                    'id' => $question->id,
                    'type' => $question->type,
                    'question' => json_decode($question->question)->$lang,
                    'options' => json_decode($question->options, true) ?? [],
                    'allow_multiple' => $question->allow_multiple,
                    'correct_answer' => json_decode($question->correct_answer),
                    'quiz_id' => $question->quiz_id,
                    'created_at' => $question->created_at,
                    'updated_at' => $question->updated_at,
                ];
            }),
        ];

        return Inertia::render("quiz/[id]", [
            "quiz" => $quizData,
            "user" => $user,
            "lang" => $lang,
        ]);
    }


    public function storeScore(Request $request)
    {
        $data = $request->query('data');
        $answers = $data['answers'];
        $user = Auth::user();

        // Use updateOrCreate to avoid duplicates
        QuizUser::updateOrCreate(
            ['user_id' => $user->id, 'quiz_id' => $data['quiz_id']],
            [
                'score' => $data['score'],
                'time' => $data['time'],
                'answers' => json_encode($answers),
            ]
        );
    }


    public function destroyQuestion(Question $question)
    {
        $question->delete();
    }
}
