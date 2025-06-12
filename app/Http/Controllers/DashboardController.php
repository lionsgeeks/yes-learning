<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\Library;
use App\Models\Quiz;
use App\Models\QuizUser;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        $quizzes = Quiz::where('published', 1)->get();
        $userQuiz = QuizUser::where('user_id', Auth::id())->get();
        $user = Auth::user();
        $libraries = Library::all();
        return Inertia::render("dashboard/dashboard", [
            "courses" => DB::table('courses')->join('user_courses', 'courses.id', '=', 'user_courses.course_id')
                ->where('user_courses.user_id', Auth::id())
                ->select('courses.*')
                ->get()
                ->map(function ($course) use ($user) {
                    $course->chapterCount = Chapter::where("course_id", $course->id)->count();
                    $course->completedCount = $user->chapters->where('course_id', $course->id)->count();
                    return $course;
                }),
            "quizzes" => $quizzes,
            "userQuiz" => $userQuiz,
            'libraries' => $libraries,
        ]);
    }

    public function adminDashboard()
    {
        // Counts
        $userCount = User::count();
        $libraryCount = Library::count();
        $completionCount = QuizUser::count();

        $courses = DB::table('courses')->get()->map(function ($course) {
            return [
                'id' => $course->id,
                'name' => json_decode($course->name)->en,
                'image' => $course->image,
                'subscribed' => DB::table('user_courses')
                    ->where('course_id', $course->id)
                    ->count()
            ];
        });


        $users = User::where('role', null)->latest()->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'language' => $user->language,
                'created_at' => $user->created_at,
                'courses' => $user->courses->count()
            ];
        });
        $quizzes = QuizUser::with('user', 'quiz')->latest()->take(40)->get();


        return Inertia::render("dashboard/adminDashboard", [
            'userCount' => $userCount,
            'libraryCount' => $libraryCount,
            'completionCount' => $completionCount,
            'users' => $users,
            'quizzes' => $quizzes,
            'courses' => $courses,
        ]);
    }


    public function steps(Request $request)
    {
        $user = Auth::user();
        $user->update([
            'language' => $request->language
        ]);

        foreach ($request->courses as $courseId) {
            UserCourse::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
            ]);
        }

        return back();
    }

    public function setLanguage()
    {
        // dd(User::where('language', null)->get());
        User::where('language', null)->update([
            'language' => 'en'
        ]);
        return back();
    }


    public function updateLanguage(Request $request)
    {
        Auth::user()->update([
            'language' => $request->language
        ]);
    }
}
