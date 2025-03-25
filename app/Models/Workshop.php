<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    //
    protected $fillable =[
        "name",
        "description",
        "course_id",
        "isComplete"
    ];


   
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
