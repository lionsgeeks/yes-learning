<?php

use App\Http\Controllers\SubWorkshopController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {
    Route::get('/workshop', [WorkshopController::class, 'studentIndex'])->name('student.workshops');
    Route::put("enroll/{subWorkshop}" , [SubWorkshopController::class , "enroll"])->name("subWorkshop.enroll");

});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/workshop/store', [WorkshopController::class, 'store'])->name('workshop.store');
    Route::resource("workshops" , WorkshopController::class);
    Route::resource("sub-workshop" , SubWorkshopController::class);
});
