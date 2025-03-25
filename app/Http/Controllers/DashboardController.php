<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        //
        $courses= DB::table('courses')->get();
        return Inertia::render("dashboard/dashboard", compact("courses"));
    }

    public function adminDashboard()
    {
        //
        return Inertia::render("dashboard/adminDashboard",);
    }
}
