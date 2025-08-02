<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrentQuestion extends Model
{
    use HasFactory;

    protected $table = 'tbl_current_question';
    protected $primaryKey = 'id';

    protected $fillable = [
        'nuumber',
        'current_point',
        'current_playoff',
    ];
}
