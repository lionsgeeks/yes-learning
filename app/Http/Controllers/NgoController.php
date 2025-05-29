<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\QuizUser;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NgoController extends Controller
{
    public function index()
    {
        return Inertia::render('ngos/index', [
            'ngos' => User::where('role', '!=', 'admin')->orWhereNull('role')->paginate(15),
        ]);
    }
    public function invitedToApp(User $user)
    {
        $user->update([
            'invitedToApp' => true,
        ]);
        return redirect()->back()->with('success', 'User invited to app successfully');
    }


    public function showNgo(User $user)
    {
        $userCourses = $user->courses()->where('published', true)->with('chapters')->get()->values()->all();
        $test = UserCourse::where('user_id', $user->id)->get();

        return Inertia::render('ngos/[id]', [
            'user' => $user,
            'userCourses' => $userCourses,
            'userChapters' => $user->chapters,
            'userQuiz' => $user->quizzes,
            'quizScore' => $user->quizScore,
        ]);
    }
}
