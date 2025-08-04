<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CurrentQuestion;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $event = [
            'number'=> 1,
            'level' => 1,
        ];

        CurrentQuestion::insertOrIgnore($event);


    }
}
