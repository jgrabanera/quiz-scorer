<?php

namespace App\Http\Controllers\Score;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CurrentQuestion;

class EventsController extends Controller
{

    public function loadEvents()
    {
        return CurrentQuestion::first();
    }

    public function updateDifficulty(Request $req)
    {
        CurrentQuestion::where('id', 1)->update(
            [
                'level' => $req->level
            ]
        );
        return response()->json(['status' => 'Difficulty Updated Successfully!']);
    }

    public function updateStage(Request $req)
    {
        CurrentQuestion::where('id', 1)->update(
            [
                'is_final' => $req->stage
            ]
        );
        return response()->json(['status' => 'Stage Updated Successfully!']);
    }
}
