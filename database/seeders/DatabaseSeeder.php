<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Yes Africa',
            'email' => 'admin@youthempowermentsummit.africa',
            'role' => 'admin',
            "language" =>"en",
            'password' => Hash::make('yesafrica'),
        ]);
        User::create([
            'name' => 'jadara',
            'email' => 'ngo@youthempowermentsummit.africa',
            'role' => NULL,
            "language" =>"en",
            'password' => Hash::make('yesafrica'),
        ]);
    }
}
