<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Payment;
use App\Models\Table;
use BcMath\Number;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Symfony\Component\String\b;

class AdminOrderController extends Controller
{
    public $year;
    public $month;
    public $day;
    public function __construct()
    {
        $this->year = Now()->format('Y');
        $this->month = Now()->format('m');
        $this->day = Now()->format('d');
    }
    public function paymentOrder(Request $request)
    {
        DB::beginTransaction();
        try {

            $data = $request->all();
            $payments = json_decode($data['payment'], true);
            if ($payments) {
                foreach ($payments as $value) {
                    $payment = Payment::create([
                        'payment_time' => now(),
                        'method' => $value['method'],
                        'amount' => $value['amount'],
                        'order_id' => $data['order_id']
                    ]);
                }
            }
            $order = Order::find($data['order_id']);
            $order->update([
                'status' => 'paid',
                'final_amount' =>  $data['final_amount'],
                'discount_method' => $data['use_points'] ? 'Dùng điểm : -' . $data['points_used_money'] : 'none'
            ]);
            $table = Table::find($order->table_id);
            $table->update([
                'status' => 'available'
            ]);
            $order->refresh();

            $totalPriceOrder = Order::where('customer_id', $order->customer_id)
                ->sum('total_amount');
            if ($totalPriceOrder >= 0 && $totalPriceOrder <= 5000000) {
                $type = 'walk-in';
            } elseif ($totalPriceOrder > 5000000 && $totalPriceOrder <= 20000000) {
                $type = 'member';
            } else {
                $type = 'vip';
            }
            $customer = Customer::find($order->customer_id);

            if ($customer->type == 'vip') {
                $discount = 10000;
            } elseif ($customer->type == 'member') {
                $discount = 11000;
            } else {
                $discount = 12000;
            }
            $point = $customer->points + ($order->total_amount / $discount);
            $customer->update([
                'points' => round($point - $data['points_used_count']),
                'type' => $type,
            ]);
            DB::commit();
            return response()->json([
                'message' => 'Thành công.',
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Thất bại :' . $e->getMessage(),
            ], 500);
        }
    }
    public function Renuve()
    {

        $order = Order::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('ROUND(SUM(total_amount), 0) as total_amount'),
            DB::raw('COALESCE(COUNT(*), 0) as total_order')
        )
            ->whereYear('created_at',  $this->year)
            ->groupBy('month')
            ->orderBy('month')
            ->get();
        $renuve = [];
        for ($i = 1; $i <= $this->month; $i++) {
            $renuve[] = [
                'month' => 'Tháng ' . $i,
                'renuve' => 0,
                'orders' => 0,
            ];
        }
        foreach ($order as $item) {
            $renuve[$item->month - 1]['renuve'] = $item->total_amount;
            $renuve[$item->month - 1]['orders'] = $item->total_order;
        }

        return response()->json($renuve);
    }
    public function orderByDay()
    {
        $date = Now()->format('Y-m-d');
        $dayOfWeek = date('N', strtotime($date));
        $data = [];
        $today = $this->day;
        for ($i = 2; $i <= (int)$dayOfWeek + 1; $i++) {
            $day = $today - ((int)$dayOfWeek + 1 - $i);
            $orderByDay = Order::select(
                DB::raw('DAY(created_at) as day'),
                DB::raw('ROUND(COUNT(*), 0) as total_order'),
            )
                ->whereDay('created_at',  $day)
                ->whereMonth('created_at',  $this->month)
                ->groupBy('day')
                ->first();
            if (!$orderByDay) {
                $value = 0;
            } else {
                $value = $orderByDay->total_order;
            }
            $data[$i - 2] = [
                'day_name' => $i != 8 ? 'Thứ ' . $i : 'Chủ nhật',
                'value' => $value
            ];
        }
        return response()->json($data);
    }
    public function revenueByDay()
    {
        $date = Now()->format('Y-m-d');
        $dayOfWeek = date('N', strtotime($date));
        $data = [];
        $today = $this->day;
        for ($i = 2; $i <= (int)$dayOfWeek + 1; $i++) {
            $day = $today - ((int)$dayOfWeek + 1 - $i);
            $orderByDay = Order::select(
                DB::raw('DAY(created_at) as day'),
                DB::raw('ROUND(SUM(total_amount), 0) as total_amount'),
            )
                ->whereDay('created_at',  $day)
                ->whereMonth('created_at',  $this->month)
                ->groupBy('day')
                ->first();
            if (!$orderByDay) {
                $value = 0;
            } else {
                $value = $orderByDay->total_amount;
            }
            $data[$i - 2] = [
                'day_name' => $i != 8 ? 'Thứ ' . $i : 'Chủ nhật',
                'value' => $value
            ];
        }
        return response()->json($data);
    }
    public function index(Request $request)
    {
        $query = Order::with('table:id,table_number', 'details.dish')
            ->where('status', $request->input('status') ?? 'paid')
            ->join('customers as c', 'orders.customer_id', 'c.id')
            ->join('users as u', 'orders.user_id', 'u.id')
            ->select(
                'c.name as cus_name',
                'u.name as u_name',
                'orders.*'
            );
        if ($request->has('start_date') && $request->has('end_date')) {
            $start = $request->input('start_date');
            $end   = $request->input('end_date');

            $today = now()->format('Y-m-d');
            if ($end > $today) {
                $end = $today;
            }
            $query->whereBetween(DB::raw('DATE(orders.created_at)'), [$start, $end]);
        }
        $orders = $query->orderBy('orders.created_at', 'desc')->paginate($request->input('page_size') ?? 6, ['*', 'page',], $request->input('page') ?? 1);

        return response()->json($orders);
    }
    public function orderByTable($table_id)
    {
        $pending = $orders =  Order::where('table_id', $table_id)
            ->where('status', 'pending')
            ->exists();
        if ($pending) {
            return response()->json([
                'status' => 'pending'
            ]);
        }
        $orders =  Order::select(
            'id',
            'table_id',
            'user_id',
            'customer_id',
            'status',
            'total_amount',
            DB::raw("DATE_FORMAT(created_at, '%H:%m:%i %d-%m-%Y') as create_ated"),
            DB::raw("DATE_FORMAT(updated_at, '%H:%m:%i %d-%m-%Y') as update_ated")
        )
            ->with(['table:id,table_number', 'user', 'details.dish', 'customer:id,name,points,type'])
            ->where('table_id', $table_id)
            ->where('status', 'serving')
            ->get();
        return response()->json($orders);
    }
    public function orderById($id)
    {
        $orders =  Order::select('id', 'table_id', 'user_id', 'customer_id', 'status', 'total_amount')
            ->with(['table:id,table_number', 'user', 'details.dish', 'customer:id,name', 'payments:order_id,method,amount,payment_time'])
            ->where('id', $id)
            ->get();
        return response()->json($orders);
    }
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        if (!$order) {
            return response()->json([
                'message' => 'Xác nhận món ăn thất bại.',
                'status' => 404
            ], 200);
        }
        $order->update([
            'status' => $request->input('status')
        ]);
        return response()->json([
            'message' => 'Xác nhận món ăn thành công.',
            'status' => 200
        ], 200);
    }
    public function destroyOrderDetailByOrder(Request $request)
    {
        try {
            $orderDetail = OrderDetail::where('order_id', $request->input('order_id'))
                ->where('dish_id', $request->input('dish_id'))
                ->first();
            $orderDetail->delete();
            return response()->json([
                'message' => 'Món ăn đã được xóa thành công',
                'status' => 200
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Xóa món ăn thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
