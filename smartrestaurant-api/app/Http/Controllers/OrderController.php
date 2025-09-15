<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;

use App\Models\Dishes;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('details.dish')->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'table_id' => 'required|exists:tables,id',
            'customer_name' => 'required|string',
            'phone' => 'required|string',
            'items' => 'required|array',
            'items.*.dish_id' => 'required|exists:dishes,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            $order = Order::create([
                'table_id' => $request->table_id,
                'customer_name' => $request->customer_name,
                'phone' => $request->phone,
                'status' => 'pending',
                'total_price' => 0,
            ]);

            $total = 0;
            foreach ($request->items as $item) {
                $dish = Dishes::findOrFail($item['dish_id']);
                $subtotal = $dish->price * $item['quantity']; // Lấy price từ database
                $total += $subtotal;

                OrderDetail::create([
                    'order_id' => $order->id,
                    'dish_id' => $dish->id,
                    'quantity' => $item['quantity'],
                    'price' => $dish->price,
                ]);
            }

            $order->update(['total_price' => $total]);

            DB::commit();
            return response()->json([
                'message' => 'Đặt món thành công!',
                'order' => $order->load('details', 'details.dish')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error("Order creation failed: " . $e->getMessage());
            return response()->json([
                'message' => 'Đặt món thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
