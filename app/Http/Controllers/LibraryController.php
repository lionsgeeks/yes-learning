<?php

namespace App\Http\Controllers;

use App\Models\Library;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function index()
    {
        return Inertia::render('libraries/index');
    }

    public function show(Library $library)
    {
        return Inertia::render('libraries/[id]', [
            'library' => $library
        ]);
    }
}
