<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SemiScore extends Model
{
    use HasFactory;

    protected $table = 'tbl_score_semi';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'question',
        'score',
'save',
    ];
}
