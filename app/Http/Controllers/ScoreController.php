<?php

namespace App\Http\Controllers;

use App\Models\CurrentQuestion;
use App\Models\FinalScore;
use App\Models\SemiScore;
use App\Models\StudentInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class ScoreController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Score');
    }

    public function getStudentInfo()
    {
        return StudentInfo::select('id', 'name', 'school', 'province')->get();
    }

    public function getFinalStudentInfo()
    {
        // return FinalScore::select('id', 'name', 'score')->get();

        return FinalScore::select('name', DB::raw('SUM(CAST(score AS UNSIGNED)) as total_score'))
            ->groupBy('name')
            ->orderByDesc('total_score')
            ->get();
    }

    public function getSemiStudentInfo()
    {
        return SemiScore::select('name', DB::raw('SUM(CAST(score AS UNSIGNED)) as total_score'))
            ->groupBy('name')
            ->orderByDesc('total_score')
            ->get();
    }

    public function insertStudentSemiScore(Request $request)
    {
        // return $request;
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'question' => 'required|integer|min:1',
            'score' => 'required|integer|min:1',
            'save' => 'required|boolean',
        ]);

        
        SemiScore::create([
            'name' => $request->name,
            'question' => $request->question,
            'score' => $request->score,
            'save' => $request->save,
        ]);
        
        Http::post('http://localhost:3001/broadcast', [
            'score' => $request->score,
            'name' => $request->name,
            'question' => $request->question,
        ]);


        return response()->json([
            'message' => 'Student score inserted successfully.',
            'data' => $data,
        ]);
    }

    public function insertStudentFinalScore(Request $request)
    {
        // return $request;
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'question' => 'required|integer|min:1',
            'score' => 'required|integer|min:1',
            'save' => 'required|boolean',
        ]);

        FinalScore::create([
            'name' => $request->name,
            'question' => $request->question,
            'score' => $request->score,
            'save' => $request->save,
        ]);

        return response()->json([
            'message' => 'Finals score inserted successfully.',
            'data' => $data,
        ]);
    }

    public function updateStudentScore(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|exists:tbl_students,id',
            'name' => 'required|string|max:255',
            'school' => 'required|string|max:255',
            'province' => 'required|string|max:255',
        ]);

        $student = StudentInfo::find($data['id']);
        $student->update($data);

        return response()->json(['message' => 'Student score updated successfully.']);
    }

    public function updateLevel(Request $request)
    {
        // return $request;
        $request->validate([
            'level' => 'required',
        ]);

        CurrentQuestion::where('id', 1)->update([
            'current_point' => $request->level
        ]);

        return response()->json([
            'message' => 'Level updated successfully.',
            'level' => $request->level
        ]);
    }

    public function updatePlayoff(Request $request)
    {
        // return $request;
        $request->validate([
            'playoff' => 'required',
        ]);

        CurrentQuestion::where('id', 1)->update([
            'current_playoff' => $request->playoff
        ]);

        return response()->json([
            'message' => 'Level updated successfully.',
            'playoff' => $request->playoff
        ]);
    }

    public function getCurrentQuestionNumber()
    {
        return CurrentQuestion::where('id', 1)->first();
    }

    public function updateCurrentQuestionNumber(Request $request)
    {
        // return $request;
        $request->validate([
            'number' => 'required|integer|min:1',
        ]);

        CurrentQuestion::where('id', 1)->update([
            'number' => $request->number
        ]);

        return response()->json([
            'message' => 'Question number updated successfully.',
            'number' => $request->number
        ]);
    }
}
