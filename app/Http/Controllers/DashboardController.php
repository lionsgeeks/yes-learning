<?php

namespace App\Http\Controllers;

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
                ->get(),
        ]);
    }

    public function adminDashboard()
    {
        //
        return Inertia::render("dashboard/adminDashboard",);
    }
}
