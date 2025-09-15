<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('tables')->insert([
            'id' => 1,
            'name' => 'Bàn 1',
            'status' => 'available',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
