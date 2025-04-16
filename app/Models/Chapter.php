<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    //

    protected $fillable = [
        'title',
        'description',
        'estimated_duration',
        'published',
        'enable_certificate',
        'enable_discussion',
        'content',
        'course_id'
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'estimated_duration' => 'array',
        'published' => 'boolean',
        'enable_certificate' => 'boolean',
        'content' => 'array',
    ];

    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function workshops()
    {
        return $this->hasMany(Workshop::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'chapter_users');
    }
}
