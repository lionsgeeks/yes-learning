<?php

namespace App\Http\Controllers;

use App\Models\SubWorkshop;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubWorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SubWorkshop $subWorkshop)
    {
        //
        return Inertia::render("workshops/admin/[subid]", [
            "subWorkshop" => $subWorkshop
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubWorkshop $subWorkshop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SubWorkshop $subWorkshop)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubWorkshop $subWorkshop)
    {
        //
    }
}
