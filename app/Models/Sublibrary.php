<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sublibrary extends Model
{
    protected $fillable = [
        'title',
        'link',
        'coach',
        'language',
        'library_id',
    ];
    public function library()
    {
        return $this->belongsTo(Library::class);
    }
    public function filelibraries()
    {
        return $this->hasMany(Filelibrary::class);
    }
}
