<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filelibrary extends Model
{
    protected $fillable = [
        'name',
        'path',
        'sublibrary_id'
    ];
    public function sublibrary() {
        return $this->belongsTo(Sublibrary::class);
    }
}
