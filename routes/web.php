<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScoreController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
 * |--------------------------------------------------------------------------
 * | Web Routes
 * |--------------------------------------------------------------------------
 * |
 * | Here is where you can register web routes for your application. These
 * | routes are loaded by the RouteServiceProvider within a group which
 * | contains the "web" middleware group. Now create something great!
 * |
 */

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/score', function () {
    return Inertia::render('Score');
});
Route::get('/get-student-info', [App\Http\Controllers\ScoreController::class, 'getStudentInfo']);
Route::get('/get-student-final', [App\Http\Controllers\ScoreController::class, 'getFinalStudentInfo']);
Route::get('/get-final-score', [App\Http\Controllers\ScoreController::class, 'getFinalScore']);
Route::get('/get-student-semi', [App\Http\Controllers\ScoreController::class, 'getSemiStudentInfo']);
Route::get('/get-current-question-number', [App\Http\Controllers\ScoreController::class, 'getCurrentQuestionNumber']);
Route::post('/insert-student-semiscore', [App\Http\Controllers\ScoreController::class, 'insertStudentSemiScore']);
Route::post('/insert-student-finalscore', [App\Http\Controllers\ScoreController::class, 'insertStudentFinalScore']);
Route::post('/update-current-question-number', [App\Http\Controllers\ScoreController::class, 'updateCurrentQuestionNumber']);
Route::post('/update-level', [App\Http\Controllers\ScoreController::class, 'updateLevel']);
Route::post('/update-playoff', [App\Http\Controllers\ScoreController::class, 'updatePlayoff']);
Route::post('/update-student-score', [App\Http\Controllers\ScoreController::class, 'updateStudentScore']);

Route::get('/leaderboard', function () {
    return Inertia::render('Leaderboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/score_routes.php';

