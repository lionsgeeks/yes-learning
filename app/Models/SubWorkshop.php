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
        'meetLink' => 'object',
        'instructor' => 'object',
        'name' => 'object',
        'description' => 'object',
        'prerequisite' => 'object',
    ];




    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class , "user_sub_workshops");
    }
}
