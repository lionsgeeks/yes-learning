<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NgoController extends Controller
{
    public function index()
    {
        return Inertia::render('ngos/index', [
            'ngos' => User::where('role', '!=', 'admin')->orWhereNull('role')->paginate(15),
        ]);
    }
    public function invitedToApp(User $user)
    {
        $user->update([
            'invitedToApp' => true,
        ]);
        return redirect()->back()->with('success', 'User invited to app successfully');
        
    }
}
