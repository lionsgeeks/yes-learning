<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {

    Route::get("/dashboard", [DashboardController::class, "dashboard"])->name("dashboard");

});


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get("/dashboard", [DashboardController::class, "adminDashboard"])->name("adminDashboard");
});