<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Score\ScoreController;
use App\Http\Controllers\Score\EventsController;
use App\Http\Controllers\Score\StudentsController;

Route::middleware(['auth'])->group( function (){
    //Students
    Route::get('/students/{stage}', [StudentsController::class, 'loadStudents']);
    Route::post('/toggle-student-finalist', [StudentsController::class, 'toggleStudentFinalist']);
    Route::get('/get-finalist', [StudentsController::class, 'getFinalist']);
    Route::get('/fetch-students', [StudentsController::class, 'fetchAllStudents']);


    
    //Events
    Route::get('/events', [EventsController::class, 'loadEvents']);
    Route::post('/update-difficulty', [EventsController::class, 'updateDifficulty']);
    Route::post('/update-stage', [EventsController::class, 'updateStage']);
    Route::post('/navigate-questions', [EventsController::class, 'navigateQuestions']);
    Route::post('/reset-items', [EventsController::class, 'resetItems']);
    Route::get('/jump-to/{number}', [EventsController::class, 'jumpTo']);
    
    
    //Score Update
    Route::get('/load-checked-students/{number}/{final}', [ScoreController::class, 'loadCheckedStudents']);
    Route::post('/toggle-student-check', [ScoreController::class, 'toggleStudentCheck']);
    
    
    Route::get('/load-leaderboard/{stage}',[ScoreController::class, 'loadLeaderboards']);

});
