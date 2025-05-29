<?php


use App\Http\Controllers\NgoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/ngos', [NgoController::class, 'index'])->name('ngos.index');
    Route::get('/ngos/{user}', [NgoController::class, 'showNgo'])->name('ngos.show');
    Route::post('/ngos/{user}/invite', [NgoController::class, 'invitedToApp'])->name('ngos.invite');
});
