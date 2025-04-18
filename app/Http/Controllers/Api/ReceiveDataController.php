<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\CredentialsMailer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ReceiveDataController extends Controller
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
        // Log::info('DATA RECEIVED FROM YES BACKEND:', $request->all());
        
        $request->validate([
            'email' => 'required',
            'name' => 'required'
        ]);
        
        $password = 'password'; //* to be changed 


        //* store recieved data to user table
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $password, //* to be changed 
        ]);

        
        
        //^ need more to send email to user with his credentials 
        
        Mail::to('chafikidrissisara@gmail.com')->send(new CredentialsMailer($password));

        return response()->json([
            'message' => 'Data received successfully',
            'received_data' => $request->all(),
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
