<?php



namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrdersTableSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('orders')->insert([
            [
                'customer_id' => 1,
                'table_id' => 1,
                'order_time' => '2025-09-22 12:00:00',
                'total_amount' => 6000000,
            ],
            [
                'customer_id' => 2,
                'table_id' => 2,
                'order_time' => '2025-09-23 18:30:00',
                'total_amount' => 3000000,
            ],
            [
                'customer_id' => 3,
                'table_id' => 1,
                'order_time' => '2025-09-24 11:15:00',
                'total_amount' => 4500000,
            ],
            [
                'customer_id' => 4,
                'table_id' => 3,
                'order_time' => '2025-09-25 20:45:00',
                'total_amount' => 7000000,
            ],
            [
                'customer_id' => 1,
                'table_id' => 2,
                'order_time' => '2025-09-26 14:00:00',
                'total_amount' => 2500000,
            ],
        ]);
    }
}
