<?php

use App\Http\Controllers\SubWorkshopController;
use App\Http\Controllers\WorkshopController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {
    Route::get('/workshop', [WorkshopController::class, 'studentIndex'])->name('student.workshops');
    Route::put("participate/{subWorkshop}" , [SubWorkshopController::class , "enroll"])->name("subWorkshop.enroll");

});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::post('/workshop/store', [WorkshopController::class, 'store'])->name('workshop.store');
    Route::put('/workshop/update/{workshop}', [WorkshopController::class, 'update'])->name('workshop.update');
    Route::delete('/workshop/destroy/{workshop}', [WorkshopController::class, 'destroy'])->name('workshop.destroy');
    Route::resource("workshops" , WorkshopController::class);
    Route::resource("sub-workshop" , SubWorkshopController::class);
    Route::delete('/subworkshop/destroy/{subWorkshop}', [SubWorkshopController::class, 'destroy'])->name('subworkshop.destroy');
    Route::put('/subworkshop/update/{subWorkshop}', [SubWorkshopController::class, 'update'])->name('subworkshop.update');
    Route::put('/subworkshop/sendnotif/{subWorkshop}', [SubWorkshopController::class, 'sendnotification'])->name('workshop.notif');
});
