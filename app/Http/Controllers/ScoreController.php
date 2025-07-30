<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    //
    public function index()
    {
        return  Inertia::render('Score');
    }
}
