<?php

use App\Http\Controllers\ProfileController;
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

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    Route::get('/score', function () {
        return Inertia::render('Score');
    });

    Route::get('/leaderboards', function () {
        return Inertia::render('Leaderboard');
    });
    
    Route::get('/finalist', function () {
        return Inertia::render('Finalist');
    });
});

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('login')->middleware('guest');
Route::post('/login', [ProfileController::class, 'login'])->middleware('guest');
Route::get('/logout', [ProfileController::class, 'logout']);

require __DIR__ . '/score_routes.php';
