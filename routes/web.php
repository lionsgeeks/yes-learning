<?php

use App\Http\Controllers\AchivementController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
 
    Route::get("/dashboard" , [DashboardController::class , "dashboard"])->name("dashboard");
    Route::get("admin/dashboard" , [DashboardController::class , "adminDashboard"])->name("adminDashboard");
    Route::resource("course" , CourseController::class);
    Route::resource("achivement" , AchivementController::class);
    Route::resource("library" , LibraryController::class);
    Route::resource("quiz" , QuizController::class);
    Route::get('/steps', function () {
        return Inertia::render('auth/steps');
    })->name('auth.steps');
});






require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
