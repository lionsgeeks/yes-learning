<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //

    protected $fillable = [
        "name",
        "description",
        "image",
        "label",
    ];
    protected $casts = [
        'name' => 'array',
        'description' => 'array',
        'label' => 'array',
    ];

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
    public function workshops()
    {
        $this->hasMany(Workshop::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_courses');
    }

    public function quiz()
    {
        return $this->hasMany(Quiz::class);
    }
}
