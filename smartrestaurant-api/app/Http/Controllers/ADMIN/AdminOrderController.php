<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function Symfony\Component\String\b;

class AdminOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public $year;
    public $month;
    public function __construct()
    {
        $this->year = Now()->format('Y');
        $this->month = Now()->format('m');
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
        for($i = 1; $i <=$this->month ; $i++){
            $renuve [] = [
                        'month' => 'Tháng '. $i,
                        'renuve' => 0,
                        'orders' => 0,
                        ]; 
        }
        foreach($order as $item){
            $renuve[$item->month-1]['renuve'] =$item->total_amount;
            $renuve[$item->month-1]['orders'] =$item->total_order;
        }
        
         return response()->json($renuve);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
