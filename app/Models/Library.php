<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
    protected $fillable = [
        'title',
        // 'image'
    ];
    protected $casts = [
        'title' => 'array'
    ];
    public function sublibraries() {
        return $this->hasMany(Sublibrary::class);
    }
}
