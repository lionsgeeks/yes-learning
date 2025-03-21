<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {
    Route::resource("course", CourseController::class);


    
});


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::resource("course", CourseController::class);
    Route::get("/courses" , [CourseController::class, 'adminIndex'])->name('admin.courses');
    Route::get("/courses/{course}" , [CourseController::class, 'adminShow'])->name('admin.courses');

});