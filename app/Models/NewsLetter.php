<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsLetter extends Model
{
    //
    protected $fillable = [
         'subject',
        'content'
    ];
    protected $casts = [
        'subject' => 'array',
        'content' => 'array',
    ];
}
