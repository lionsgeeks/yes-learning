<?php

use App\Http\Controllers\NewsLetterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', "role:user"])->group(function () {
    Route::get('/steps', function () {
        return Inertia::render('auth/steps');
    })->name('auth.steps');
});


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::resource("newsletter" , NewsLetterController::class);
    Route::get("/news_letter/history" , [NewsLetterController::class, 'history'])->name('newsletter.history');

});



require __DIR__ . '/settings.php';
require __DIR__ . '/dashboard.php';
require __DIR__ . '/achievment.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/workshops.php';
require __DIR__ . '/courses.php';
require __DIR__ . '/library.php';
require __DIR__ . '/quiz.php';
