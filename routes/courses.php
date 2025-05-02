<?php

use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user" ,"steps"])->group(function () {
    Route::resource("course", CourseController::class);
    Route::put("enroll/{course}" , [CourseController::class , "enroll"])->name("course.enroll");
    Route::post("/chapter/read" , [ChapterController::class, 'readChapters'])->name('chapter.read');



});


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::resource("course", CourseController::class);
    Route::resource("chapter", ChapterController::class);
    Route::get("/courses" , [CourseController::class, 'adminIndex'])->name('admin.courses.index');
    Route::get("/courses/{course}" , [CourseController::class, 'adminShow'])->name('admin.courses.show');
    Route::get("courses/preview/{course}" , [CourseController::class , "preview"])->name("course.preview");
    Route::post('/share/shapter', [ChapterController::class, 'shareBlock'])->name('chapter.share');
});
