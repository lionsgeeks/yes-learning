<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Course;
use App\Models\Library;
use App\Models\QuizUser;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        //
        return Inertia::render("dashboard/dashboard", [
            "courses" => DB::table('courses')->join('user_courses', 'courses.id', '=', 'user_courses.course_id')
                ->where('user_courses.user_id', Auth::id())
                ->select('courses.*')
                ->get()->map(function ($course) {
                    $course->chapterCount = Chapter::where("course_id", $course->id)->count();
                    return $course;
                })
        ]);
    }

    public function adminDashboard()
    {
        // Counts
        $userCount = User::count();
        $courseCount = Course::count();
        $libraryCount = Library::count();
        $completionCount = QuizUser::count();

        $users = User::latest()->take(4)->get();
        $quizzes = QuizUser::with('user', 'quiz')->get();


        return Inertia::render("dashboard/adminDashboard", [
            'userCount' => $userCount,
            'courseCount' => $courseCount,
            'libraryCount' => $libraryCount,
            'completionCount' => $completionCount,
            'users' => $users,
            'quizzes' => $quizzes,
        ]);
    }
}
