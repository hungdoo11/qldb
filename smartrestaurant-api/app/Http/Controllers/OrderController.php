<?php

namespace App\Http\Controllers;

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
        // $request->validate([
        //     'table_id' => 'required|exists:tables,id',
        //     'customer_name' => 'required|string',
        //     'phone' => 'required|string',
        //     'items' => 'required|array',
        //     'items.*.dish_id' => 'required|exists:dishes,id',
        //     'items.*.quantity' => 'required|integer|min:1',
        // ]);

        // DB::beginTransaction();
        // try {
           

        //     DB::commit();
        //     return response()->json([
        //         'message' => 'Đặt món thành công!',
        //     ], 201);
        // } catch (\Exception $e) {
        //     DB::rollBack();
        //     Log::error("Order creation failed: " . $e->getMessage());
        //     return response()->json([
        //         'message' => 'Đặt món thất bại',
        //         'error' => $e->getMessage()
        //     ], 500);
        // }
        $data = $request->all();
        $order = Order::create([
            'table_id' => $data['table_id'],
            'customer_id'=> $data['customer_id'],
            'user_id'=> $data['user_id'],
            'order_time'=> $data['order_time'],
            'total_amount' => $data['total_amount'],
        ]);
        $arrayOrderDetails = json_decode($data['order_detail'], true);
        foreach( $arrayOrderDetails as $value){
            $orderDetail = OrderDetail::create([
                'order_id'=>  $order->id,
                'dish_id'=>$value['dish_id'],
                'quantity'=> $value['quantity'],
                'price'=> $value['price'],
            ]);
        }
        $table = Table::findOrFail($data['table_id']);
        $table->update([
            'status' => 'occupied'
        ]);
        return response()->json($order);
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
