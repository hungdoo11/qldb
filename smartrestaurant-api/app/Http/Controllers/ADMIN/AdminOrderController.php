<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Table;
use BcMath\Number;
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
        $query = Order::with('table:id,table_number')
            ->where('status', 'paid')
            ->join('customers as c', 'orders.customer_id', 'c.id')
            ->join('users as u', 'orders.user_id', 'u.id')
            ->select(
                'c.name as cus_name',
                'u.name as u_name',
                'orders.*'
            );

        // ✅ Lọc theo khoảng thời gian
        if ($request->has('start_date') && $request->has('end_date')) {
            $start = $request->input('start_date');
            $end   = $request->input('end_date');

            // không cho lớn hơn ngày hiện tại
            $today = now()->format('Y-m-d');
            if ($end > $today) {
                $end = $today;
            }

            $query->whereBetween(DB::raw('DATE(orders.created_at)'), [$start, $end]);
        }

        // ✅ Phân trang (11 đơn hàng / trang)
        $orders = $query->orderBy('orders.created_at', 'desc')->paginate(11);

        return response()->json($orders);
    }
    public function orderByTable($table_id)
    {
        $orders =  Order::select('id', 'table_id', 'user_id', 'customer_id', 'status', 'total_amount')
            ->with(['table:id,table_number', 'user', 'details.dish', 'customer:id,name'])
            ->where('table_id', $table_id)
            ->where('status', 'serving')
            ->get();
        return response()->json($orders);
    }
}
