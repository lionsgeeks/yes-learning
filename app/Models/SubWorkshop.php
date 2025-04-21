<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubWorkshop extends Model
{
    //
    protected $fillable=[
        "name",
        "description",
        "prerequisite",
        "chapter_id",
        "date",
        "time",
        "workshop_id",
        "duration",
        "instructor",
        "meetLink",
        "allowQuestions",
        "requireRegistration",
        "sendNotifications",
        "published"


    ];
    protected $casts = [
        'meetLink' => 'array',
        'instructor' => 'array',
        'name' => 'array',
        'description' => 'array',
        'prerequisite' => 'array',
    ];

    public function workshop() {
        return $this->belongsTo(Workshop::class);
    }


    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class , "user_sub_workshops");
    }
}
