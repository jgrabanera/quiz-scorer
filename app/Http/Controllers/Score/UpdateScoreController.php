<?php

namespace App\Http\Controllers\Score;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CurrentQuestion;
use App\Models\Score;

class UpdateScoreController extends Controller
{
    public function toggleStudentCheck(Request $req)
    {
        $current_event = CurrentQuestion::find(1);

        $existing = Score::where('name', $req->name)
            ->where('question', $current_event->number)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['status' => 'Deleted']);
        } else {
            Score::create([
                'name' => $req->name,
                'question' => $current_event->number,
                'score' => $current_event->level,
            ]);
            return response()->json(['status' => 'Inserted']);
        }
    }

    public function loadCheckedStudents(){
        $current_event = CurrentQuestion::find(1);
        $checked = Score::where('question', $current_event->number)
        ->pluck('name'); 

    return response()->json($checked);
    }
}
