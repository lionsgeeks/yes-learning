<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NewsLetterController;
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


Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {

    Route::resource("newsletter" , NewsLetterController::class);
    Route::get("/news_letter/history" , [NewsLetterController::class, 'history'])->name('newsletter.history');

});



Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/newsletter', [App\Http\Controllers\NewsletterController::class, 'index'])->name('admin.newsletter.index');
    Route::post('/admin/newsletter/send', [App\Http\Controllers\NewsletterController::class, 'send'])->name('admin.newsletter.send');
    Route::post('/admin/newsletter/schedule', [App\Http\Controllers\NewsletterController::class, 'schedule'])->name('admin.newsletter.schedule');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/dashboard.php';
require __DIR__ . '/achievment.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/workshops.php';
require __DIR__ . '/courses.php';
require __DIR__ . '/library.php';
require __DIR__ . '/quiz.php';



use Illuminate\Support\Facades\Artisan;

Route::get('/deploy', function () {
  
    

    // Run shell commands
    exec('git pull origin main 2>&1', $gitOutput);
    exec('npm ci 2>&1', $npmInstallOutput);
    exec('npm run build 2>&1', $npmBuildOutput);

    // Laravel commands
    Artisan::call('config:cache');
    Artisan::call('route:cache');
    Artisan::call('view:clear');
    Artisan::call('optimize:clear');

    return response()->json([
        'status' => '✅ Deployment successful!',
        'git' => $gitOutput,
        'npm install' => $npmInstallOutput,
        'npm build' => $npmBuildOutput,
    ]);
});