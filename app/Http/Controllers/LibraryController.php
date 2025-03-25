<?php

namespace App\Http\Controllers;

use App\Models\Library;
use App\Models\Sublibrary;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function index()
    {
        return Inertia::render('libraries/student/index');
    }

    public function show(Library $library)
    {
        return Inertia::render('libraries/student/[id]', [
            'library' => $library
        ]);
    }
    public function showSublibraries(Sublibrary $sublibrary)
    {
        return Inertia::render('libraries/student/subLibraries', [
            'sublibrary' => $sublibrary
        ]);
    }

    public function adminLibraries() {
        return Inertia::render('libraries/admin/index');
    }
    public function createLibrary(){
        return Inertia::render('libraries/admin/createLibrary');
    }
    public function createSubLibrary(){
        return Inertia::render('libraries/admin/subLibrary');
    }
}
