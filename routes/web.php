<?php

use App\Http\Controllers\AchivementController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\NewsLetterController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SubWorkshopController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', "role:user"])->group(function () {

    Route::get('/steps', function () {
        return Inertia::render('auth/steps');
    })->name('auth.steps');
    Route::resource("course", CourseController::class);
    Route::resource("library", LibraryController::class);
    Route::resource("quiz", QuizController::class);
});


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

   
    Route::resource("course", CourseController::class);
    Route::resource("library", LibraryController::class);
    Route::get('/libraries', [LibraryController::class, 'adminLibraries'])->name('admin.library');
    Route::get('/create/library', [LibraryController::class, 'createLibrary'])->name('admin.create');
    Route::resource("quiz", QuizController::class);
    Route::get('/steps', function () { return Inertia::render('auth/steps');})->name('auth.steps');
    Route::get('/sub_library/{id}', [LibraryController::class, 'showSublibraries'])->name('sublibrary.show');
    Route::resource("newsletter", NewsLetterController::class);
    Route::get("/news_letter/history", [NewsLetterController::class, 'history'])->name('newsletter.history');
    Route::get('/quiz', function () {return Inertia::render('quiz/index');})->name('quiz.index');
    Route::resource("workshops" , WorkshopController::class);
    Route::resource("sub-workshop" , SubWorkshopController::class);
    
});



require __DIR__ . '/settings.php';
require __DIR__ . '/dashboard.php';
require __DIR__ . '/achievment.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/workshops.php';
