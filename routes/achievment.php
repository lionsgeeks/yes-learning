<?php

use App\Http\Controllers\AchivementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user", "steps"])->group(function () {

    Route::resource("achievement", AchivementController::class);
});
Route::middleware(['auth', 'verified', "role:admin", "steps"])->prefix('admin')->group(function () {

    Route::get("/ngos", [AchivementController::class, "showNgos"]);
});
