<?php

use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// TODO* Something is wrong here. I can feel it. fix later.
Route::middleware(['auth', 'verified', "role:user"])->group(function () {
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
