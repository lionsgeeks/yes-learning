<?php

use App\Http\Controllers\Api\ReceiveDataController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// * the recieved data coming from yes backend
Route::post('/receive-data', [ReceiveDataController::class, 'store']);
Route::post('/selected-ngo', [ReceiveDataController::class, 'FormsData']);