<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentInfo extends Model
{
    use HasFactory;
    protected $table = 'tbl_students';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'school',
        'province',
    ];
}
