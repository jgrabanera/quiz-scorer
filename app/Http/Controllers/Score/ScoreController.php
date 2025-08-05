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
                'is_final' => $req->stage
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
        return Score::where('tbl_score.is_final', $stage)
            ->leftJoin('tbl_students', 'tbl_students.name', '=', 'tbl_score.name')
            ->select(
                'tbl_students.id',
                'tbl_students.name',
                'tbl_students.school',
                DB::raw('SUM(tbl_score.score) as total_score')
            )
            ->groupBy('tbl_students.name', 'tbl_students.school', 'tbl_students.id')
            ->orderByDesc('total_score')
            ->get();
    }
}
