<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        //
        $courses= Course::all();
        return Inertia::render("dashboard/dashboard", compact("courses"));
    }

    public function adminDashboard()
    {
        //
        return Inertia::render("dashboard/adminDashboard",);
    }
}
