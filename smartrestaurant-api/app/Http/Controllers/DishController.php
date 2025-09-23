<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Dishes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DishController extends Controller
{
    public function index()
    {
        $url = config('app.url');
        $dishes = Dishes::join('categories as c', 'dishes.category_id', 'c.id')
            ->select(
                'dishes.*',
                'c.name as category_name',
                DB::raw("CONCAT('$url/',dishes.image) as image_path")
            )
            ->get();
        return response()->json($dishes);
    }
    public function dishesCategory(Request $request, $id){
        $url = config('app.url');
        $dishes = Dishes::join('categories as c', 'dishes.category_id', 'c.id')
            ->select(
                'dishes.*',
                'c.name as category_name',
                DB::raw("CONCAT('$url/',dishes.image) as image_path")
            )
            ->where('category_id', $id)
            ->get();
        return response()->json($dishes);
    }


  
}
