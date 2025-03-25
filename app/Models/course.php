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


    public function workshops(){
        $this->hasMany(Workshop::class);
    }
}
