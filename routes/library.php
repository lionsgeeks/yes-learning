<?php

use App\Http\Controllers\LibraryController;
use App\Http\Controllers\SublibraryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', "role:user" ,"steps"])->group(function () {
    Route::resource("library", LibraryController::class);
    Route::get('/ngo/library/{library}',[LibraryController::class, 'showLibrary'])->name('library.show');
    Route::get('/ngo/sublibrary/{sublibrary}',[LibraryController::class, 'showSubLibrary'])->name('sublibrary.show');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/libraries', [LibraryController::class, 'adminLibraries'])->name('admin.library');
    Route::get('/create/library', [LibraryController::class, 'createLibrary'])->name('admin.create');
    Route::get('/create/library/{id}/subLibrary', [LibraryController::class, 'createSubLibrary'])->name('admin.createSub');
    Route::resource("library", LibraryController::class);
    Route::resource("sublibrary", SublibraryController::class);
    Route::delete('/delete/file/{filelibrary}', [SublibraryController::class, 'deleteFile'])->name('file.delete');

});
