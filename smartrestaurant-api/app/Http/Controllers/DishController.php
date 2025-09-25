<?php

namespace App\Http\Controllers;

use App\Models\Dishes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DishController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 2);
        $categoryId = $request->query('category_id');
        $search = $request->query('search');

        $query = Dishes::query();
        $query->leftJoin('categories as c', 'dishes.category_id', 'c.id')
            ->select(
                'dishes.*',
                'c.name as category_name',
                DB::raw("CONCAT('" . config('app.url') . "', '/', dishes.image) as image_path")
            );

        if ($categoryId) {
            $query->where('dishes.category_id', $categoryId);
        }

        if ($search) {
            $query->where('dishes.name', 'like', '%' . $search . '%');
        }

        $dishes = Dishes::paginate($perPage, ['*'], 'page', $page);
        $data = $dishes->items();
        foreach ($data as &$item) {
            $category = \App\Models\Category::find($item->category_id);
            $item->category_name = $category ? $category->name : '';
            $item->image_path = $item->image ? config('app.url') . '/' . $item->image : null;
        }

        Log::info('Pagination Debug:', [
            'total_records' => $dishes->total(),
            'per_page' => $perPage,
            'last_page' => $dishes->lastPage(),
            'current_page' => $dishes->currentPage(),
        ]);

        return response()->json([
            'data' => $data,
            'current_page' => $dishes->currentPage(),
            'last_page' => $dishes->lastPage(),
            'total' => $dishes->total(),
        ]);
    }
    public function dishesCategory(Request $request, $id)
    {
        $url = config('app.url');
        $dishes = Dishes::join('categories as c', 'dishes.category_id', 'c.id')
            ->select(
                'dishes.*',
                'c.name as category_name',
                DB::raw("CONCAT('$url/', dishes.image) as image_path")
            )
            ->where('category_id', $id)
            ->get();
        return response()->json($dishes);
    }
}
