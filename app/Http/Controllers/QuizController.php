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

        $quiz = Quiz::where('course_id', $request->course_id)->with('questions')->first();

        if (!$quiz) {
            $quiz = Quiz::create($quizData);
        } else {
            $quiz->update($quizData);
        }

        $existingIds = $quiz->questions->pluck('id')->toArray();

        foreach ($request->questions as $quest) {
            // Skip if this question already exists
            if (!empty($quest['id']) && in_array($quest['id'], $existingIds)) {
                continue;
            }

            $options = isset($quest['options'])
                ? json_encode(array_map(fn($item) => Arr::except($item, ['id']), $quest['options']))
                : null;

            Question::create([
                'quiz_id' => $quiz->id,
                'type' => $quest['type'],
                'question' => $quest['text'],
                'options' => $options,
                'allow_multiple' => $quest['allow_multiple'] ?? null,
                'correct_answer' => $quest['correct_answer'] ?? null,
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
        $quizData = [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'description' => $quiz->description,
            'timeLimit' => $quiz->time_limit,
            'passingScore' => 70,
            'chapter_id' => $quiz->chapter_id,
            'questions' => $quiz->questions()->get()->map(function ($question) {
                return [
                    'id' => $question->id,
                    'type' => $question->type,
                    'question' => $question->question,
                    'options' => json_decode($question->options, true) ?? [],
                    'allow_multiple' => $question->allow_multiple,
                    'correct_answer' => $question->correct_answer,
                    'quiz_id' => $question->quiz_id,
                    'created_at' => $question->created_at,
                    'updated_at' => $question->updated_at,
                ];
            }),
        ];

        return Inertia::render("quiz/[id]", [
            "quiz" => $quizData,
            "user" => $user,
        ]);
    }


    public function storeScore(Request $request)
    {
        $data = $request->query('data');

        $score = $data['score'];
        $time = $data['time'];
        $answers = $data['answers'];
        $quiz_id = $data['quiz_id'];
        $user = Auth::user();

        QuizUser::create([
            'user_id' => $user->id,
            'quiz_id' => $quiz_id,
            'score' => $score,
            'time' => $time,
            'answers' => json_encode($answers),
        ]);
    }


    public function destroyQuestion(Question $question)
    {
        $question->delete();
    }
}
