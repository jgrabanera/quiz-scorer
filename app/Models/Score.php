<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $table = 'tbl_score';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'question',
        'score',
        'is_final'
    ];
}
