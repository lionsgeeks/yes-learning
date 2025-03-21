<?php

namespace App\Http\Controllers;

use App\Models\NewsLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsLetterController extends Controller
{

    public function index()
    {
        return Inertia::render('newsletter/index');
    }


    public function history()
    {
        return Inertia::render('newsletter/history/index');
    }
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }
    

    public function show(NewsLetter $newsLetter)
    {
        //
    }


    public function edit(NewsLetter $newsLetter)
    {
        //
    }


    public function update(Request $request, NewsLetter $newsLetter)
    {
        //
    }

    public function destroy(NewsLetter $newsLetter)
    {
        //
    }
}
