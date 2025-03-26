<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function dashboard()
    {
        //
        $userId = Auth::id(); // hna khdit l id  ta3 l auth user

        return Inertia::render("dashboard/dashboard", [
            "courses" => Course::with("users:id")->get()->map(function ($course) use ($userId) { // mappit 3la ga3 l courses  o 3ayat m3ahom 3la l users  o 3ayat ghi 3la l id dyal l user  li 
                //an7tajo bach n9arn  wach m enrolli fl course to avoid loading data li mam7tajhach
                $course->enrolled = $course->users->contains("id", $userId); // zdt value jdid fl courses  li howa  enrolled  bach n3rf wh l user  m enrolli ola la 
                $course->enrolledCount = $course->users()->count();
                unset($course->users); // hna 9bel mansift data  unlinkit l relation bach matmchich l  front  ( makayn lach  tmchi 7it lgharad  howa  n9ad kolchi  fl backend)
                return $course; //  akhiran  had l3ayba o l3ziz 3la amimto 3mro maytkhas
            })
        ]);
    }

    public function adminDashboard()
    {
        //
        return Inertia::render("dashboard/adminDashboard",);
    }
}
