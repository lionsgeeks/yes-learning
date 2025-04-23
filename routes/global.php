<?php

use App\Http\Controllers\DashboardController;
use App\Models\Course;
use Illuminate\Container\Attributes\Auth as AttributesAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware(['auth', 'verified', 'role:user'])->group(function () {

    Route::get('/steps', function () {
        $user = Auth::user();
        // dd($user);
        if (!$user->language) {
            $courses = Course::all();
            return Inertia::render('auth/steps', compact('courses'));
        } else {
            return redirect()->route('dashboard');
        }
    })->name('auth.steps');

    Route::post('/stepss', [DashboardController::class, 'steps'])->name('stepss');

});

Route::post('/update/language', [DashboardController::class, 'updateLanguage'])->name('langugage.update');



Route::get('/unzip', function () {
    $zip = new \ZipArchive;
    $zipPath = public_path('build.zip'); 
    $extractTo = public_path('build');    

    if (!file_exists($zipPath)) {
        return 'Zip file not found.';
    }

    if (!file_exists($extractTo)) {
        mkdir($extractTo, 0777, true);
    }

    if ($zip->open($zipPath) === TRUE) {
        $zip->extractTo($extractTo);
        $zip->close();
    } else {
        return 'Failed to unzip.';
    }

    // OPTIONAL: Change directory before git pull (must be a git repo)
    $repoPath = base_path(); // Or any folder with a .git repo
    $output = [];
    $resultCode = 0;
    exec("cd $repoPath && git pull", $output, $resultCode);

    if ($resultCode === 0) {
        return 'Unzipped and git pulled successfully:<br>' . implode('<br>', $output);
    } else {
        return 'Unzipped, but git pull failed:<br>' . implode('<br>', $output);
    }
});