<?php

namespace App\Http\Controllers;
use App\Models\StudentInfo;
use App\Models\CurrentQuestion;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    //
    public function index()
    {
        return  Inertia::render('Score');
    }

     public function getStudentInfo()
    {
        return StudentInfo::select('id', 'name', 'school', 'province')->get();
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
         $request->validate([
            'level' => 'required|string|in:Easy,Average,Difficult',
        ]);


        CurrentQuestion::where('id',1)->update([
            'current_point' => $request->level === 'Easy' ? 1 : ( $request->level === 'Average' ? 3 : 5),
        ]);

        return response()->json(['message' => 'Level updated successfully.']);
    }

    public function getCurrentQuestionNumber()
    {
        return CurrentQuestion::where('id',1)->First();

    }
       public function updateCurrentQuestionNumber(Request $request)
    {
        $data = $request->validate([
            'number' => 'required|integer|min:1',
        ]);

        CurrentQuestion::where('id',1)->update([
            'number' => $data['number'],
        ]);

        return response()->json(['message' => 'Question number updated successfully.']);

    }
}
