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
        "duration",
        "instructor",
        "meetLink",
        "allowQuestions",
        "requireRegistration",
        "sendNotifications",
        "published"


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
