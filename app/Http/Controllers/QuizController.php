<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizUser;
use Illuminate\Http\Request;
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
    public function store($request, $chapter)
    {
        $quiz = Quiz::create([
            'title' => $request->quizTitle,
            'description' => $request->quizDescription,
            'time_limit' => $request->quizTime,
            'published' => $request->quizPublish,
            'chapter_id' => $chapter->id,
        ]);

        foreach ($request->questions as $quest) {
            $answers = null;
            if (array_key_exists('options', $quest)) {
                $filteredData = array_map(function ($item) {
                    unset($item['id']);
                    return $item;
                }, $quest['options']);

                $answers = json_encode($filteredData);
            }

            Question::create([
                'quiz_id' => $quiz->id,
                'type' => $quest['type'],
                'question' => $quest['text'],
                'answers' => $answers ?? null,
                'allow_multiple' => $quest['allowMultiple'] ?? null,
                'correct_answer' => $quest['correctAnswer'] ?? null
            ]);
        }
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
                    'options' => json_decode($question->answers, true) ?? [],
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
}
