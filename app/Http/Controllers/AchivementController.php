<?php

namespace App\Http\Controllers;

use App\Models\Achivement;
use App\Models\Quiz;
use App\Models\QuizUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AchivementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $quizzes = Quiz::all();
        $userQuiz = QuizUser::where('user_id',Auth::id())->get();

        return Inertia::render("achivements/user/index", [
            'quizzes' => $quizzes,
            'userQuiz' => $userQuiz,
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Achivement $achivement)
    {
        //
        return Inertia::render("achivements/user/[id]", [
            "achivement" => $achivement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Achivement $achivement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Achivement $achivement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Achivement $achivement)
    {
        //
    }
}
