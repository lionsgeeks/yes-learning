<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{

    protected $fillable = [
        'title',
        'description',
        'time_limit',
        'published',
        'course_id',
    ];

    protected $casts = [
        'title' => 'object',
        'description' => 'object',
    ];


    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'quiz_users');
    }
}
