<?php

use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified', "role:user" ,"steps"])->group(function () {
    Route::resource("quiz", QuizController::class);

    Route::post('/store/score', [QuizController::class, 'storeScore'])->name('store.score');
});


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::resource("quiz", QuizController::class);
    Route::get('/quiz', function () {
        return Inertia::render('quiz/index');
    })->name('quiz.index');


    Route::delete('/question/{question}', [QuizController::class, 'destroyQuestion'])->name('question.destroy');
});
