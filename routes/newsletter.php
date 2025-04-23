<?php

use App\Http\Controllers\NewsletterController;
use Illuminate\Support\Facades\Route;
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::resource("newsletter" , NewsletterController::class);
    Route::get("/news_letter/history" , [NewsLetterController::class, 'history'])->name('newsletter.history');

});



Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/newsletter', [App\Http\Controllers\NewsletterController::class, 'index'])->name('admin.newsletter.index');
    Route::post('/admin/newsletter/send', [App\Http\Controllers\NewsletterController::class, 'send'])->name('admin.newsletter.send');
    Route::post('/admin/newsletter/schedule', [App\Http\Controllers\NewsletterController::class, 'schedule'])->name('admin.newsletter.schedule');
});
