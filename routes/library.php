<?php

use App\Http\Controllers\LibraryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user"])->group(function () {
    Route::resource("library", LibraryController::class);
    Route::get('/sub_library/{id}',[LibraryController::class, 'showSublibraries'])->name('sublibrary.show');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/libraries', [LibraryController::class, 'adminLibraries'])->name('admin.library');
    Route::get('/create/library', [LibraryController::class, 'createLibrary'])->name('admin.create');
    Route::get('/create/library/{id}/subLibrary', [LibraryController::class, 'createSubLibrary'])->name('admin.createSub');
    Route::resource("library", LibraryController::class);
    // Route::get('/sub_library/{id}', [LibraryController::class, 'showSublibraries'])->name('sublibrary.show');

}); 
