<?php

namespace App\Http\Controllers\Score;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CurrentQuestion;
use App\Models\Score;
use Illuminate\Support\Facades\DB;
class ScoreController extends Controller
{
    public function toggleStudentCheck(Request $req)
    {
        $existing = Score::where('name', $req->name)
            ->where('question', $req->number)
            ->where('is_final', $req->stage)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['status' => 'Deleted']);
        } else {
            Score::create([
                'name' => $req->name,
                'question' => $req->number,
                'score' => $req->level,
                'is_final'=> $req->stage
            ]);
            return response()->json(['status' => 'Inserted']);
        }
    }

    public function loadCheckedStudents(String $number, String $final)
    {
        $checked = Score::where('question', $number)->where('is_final', $final)
            ->get();

        return response()->json($checked);
    }

    public function loadLeaderboards(String $stage)
    {
        return Score::where('is_final', $stage)
            ->select('name', DB::raw('SUM(score) as total_score'))
            ->groupBy('name')
            ->orderByDesc('total_score')
            ->get();
    }
}
