<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserSubWorkshop extends Model
{
    //

    protected $fillable = [
        "user_id",
        "sub_workshop_id",
    ];
}
