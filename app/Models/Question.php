<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{


    protected $fillable = [
        'quiz_id',
        'type',
        'question',
        'answers',
        'allow_multiple',
        'correct_answer',
    ];


    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
