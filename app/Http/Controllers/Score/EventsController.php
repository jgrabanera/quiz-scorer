<?php

namespace App\Http\Controllers\Score;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CurrentQuestion;
use App\Models\Score;

class EventsController extends Controller
{

    public function loadEvents()
    {
        return CurrentQuestion::first();
    }

    public function updateDifficulty(Request $req)
    {
        $current_event = CurrentQuestion::find(1);
        $current_event->update(
            [
                'level' => $req->level
            ]
        );
        Score::where('question',$current_event->number)->update(['score' => $current_event->level]);
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

    public function navigateQuestions(Request $req)
    {
        $current_event = CurrentQuestion::find(1);
        $current_event->update(['number' => $req->actions == 1 ? $current_event->number + 1 : $current_event->number - 1]);
        return response()->json(['status' => 'Updated']);
    }
    public function resetItems()
    {
        $current_event = CurrentQuestion::find(1);
        $current_event->update(['number' => 1]);
        return response()->json(['status' => 'Updated']);
    }

    public function jumpTo(String $number)
    {
        $current_event = CurrentQuestion::find(1);
        $current_event->update(['number' => $number]);
        return response()->json(['status' => 'Updated']);
    }
}
