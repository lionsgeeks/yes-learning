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
        'published' => 'boolean',
        'enable_certificate' => 'boolean',
        'content' => 'array', 
    ];


    
    public function workshops()
    {
        $this->hasMany(Workshop::class);
    }
}
