<?php

namespace App\Http\Controllers;

use App\Events\OrderNew;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;

use App\Models\Dishes;
use App\Models\Table;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('details.dish')->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $order = Order::create([
                'table_id' => $data['table_id'],
                'customer_id' => $data['customer_id'],
                'order_time' => $data['order_time'],
                'total_amount' => $data['total_amount'],
            ]);
            $arrayOrderDetails = json_decode($data['order_detail'], true);
            foreach ($arrayOrderDetails as $value) {
                $orderDetail = OrderDetail::create([
                    'order_id' =>  $order->id,
                    'dish_id' => $value['dish_id'],
                    'quantity' => $value['quantity'],
                    'price' => $value['price'],
                ]);
            }
            $table = Table::findOrFail($data['table_id']);
            $table->update([
                'status' => 'occupied'
            ]);
            DB::commit();
            broadcast(New OrderNew(1));
            return response()->json([
                'message' => 'Đặt món thành công!',
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Order creation failed: " . $e->getMessage());
            return response()->json([
                'message' => 'Đặt món thất bại',
                'error' => $e->getMessage()
            ], 500);
        }

    }
    
    public function getOrdersByUser($id)
    {
        $orders = Order::with('items.dish')
            ->where('user_id', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }
}
