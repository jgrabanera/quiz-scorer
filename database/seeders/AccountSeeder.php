<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $account = [
            'username' => 'starbooks',
            'password' => Hash::make('Starbooks@2025'),
        ];

        User::insertOrIgnore($account);
    }
}
