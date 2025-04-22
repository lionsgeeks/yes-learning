<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledNewsletter extends Model
{
    //
    protected $fillable = [
        'subject',
        'content',
        'courses',
        'recipient_type',
        'schedule_date',
    ];
    protected $casts = [
        'courses' => 'array',
        'schedule_date' => 'datetime',
    ];
}
