<?php

use App\Http\Controllers\AchivementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {

    Route::resource("achievement", AchivementController::class);
});



