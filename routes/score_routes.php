<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Score\UpdateScoreController;
use App\Http\Controllers\Score\EventsController;
use App\Http\Controllers\Score\StudentsController;

//Students
Route::get('/students', [StudentsController::class, 'loadStudents']);

//Events
Route::get('/events', [EventsController::class, 'loadEvents']);
Route::post('/update-difficulty', [EventsController::class, 'updateDifficulty']);
Route::post('/update-stage', [EventsController::class, 'updateStage']);

//Score Update
Route::get('/load-checked-students', [UpdateScoreController::class, 'loadCheckedStudents']);
Route::post('/toggle-student-check', [UpdateScoreController::class,'toggleStudentCheck']);

?>