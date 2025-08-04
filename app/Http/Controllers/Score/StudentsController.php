<?php

namespace App\Http\Controllers\Score;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentsController extends Controller
{

    public function loadStudents(String $stage)
    {
        return Student::where('is_finalist', $stage)->get();
    }
    public function fetchAllStudents()
    {
        return Student::all();
    }

    public function toggleStudentFinalist(Request $req)
    {
        $student = Student::where('name', $req->name)->first();
        $student->is_finalist = $student->is_finalist ? 0 : 1;
        $student->save();

        return response()->json([
            'status' => $student->is_finalist ? 'Inserted' : 'Deleted',
            'is_finalist' => $student->is_finalist
        ]);
    }

    public function getFinalist()
    {
        return Student::where('is_finalist', 1)->pluck('name');
    }
}
