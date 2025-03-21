<?php

use App\Http\Controllers\SubWorkshopController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {
    Route::get('/workshop', [WorkshopController::class, 'studentIndex'])->name('student.workshops');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::resource("workshops" , WorkshopController::class);
    Route::resource("sub-workshop" , SubWorkshopController::class);
});
