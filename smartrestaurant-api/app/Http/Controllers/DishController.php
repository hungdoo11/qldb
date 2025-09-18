<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Dishes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DishController extends Controller
{
    // Lấy tất cả món ăn
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


    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|integer',
            'status' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);


        $imageName = null;
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->getClientOriginalName();
            $request->file('image')->storeAs('images', $imageName, 'public');
        }
        $dish = Dishes::create([
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'image' => 'storage/images/' . $imageName
        ]);


        return response()->json($dish);
    }


    // ✅ Xem chi tiết món ăn
    public function show($id)
    {
        $dish = Dishes::findOrFail($id);
        return response()->json($dish);
    }

    // ✅ Cập nhật món ăn
    public function update(Request $request, $id)
    {
        $dish = Dishes::findOrFail($id);

        // Validate
        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|integer',
            'status' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Cập nhật các trường text/number
        $dish->name = $request->name;
        $dish->price = $request->price;
        $dish->quantity = $request->quantity;
        $dish->category_id = $request->category_id;
        $dish->status = $request->status;

        // Nếu có upload ảnh mới
        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu có
            if ($dish->image && file_exists(public_path($dish->image))) {
                unlink(public_path($dish->image));
            }

            $imageName = time() . '.' . $request->image->getClientOriginalName();
            $request->file('image')->storeAs('images', $imageName, 'public');
            $dish->image = 'storage/images/' . $imageName;
        }

        $dish->save();

        return response()->json($dish);
    }


    // Xóa món ăn theo id
    public function destroy($id)
    {
        try {
            $dish = Dishes::findOrFail($id);

            // Nếu món ăn có ảnh, xóa file ảnh trên storage
            if ($dish->image && \Storage::disk('public')->exists(str_replace('storage/', '', $dish->image))) {
                \Storage::disk('public')->delete(str_replace('storage/', '', $dish->image));
            }

            $dish->delete(); // xóa bản ghi trong database

            return response()->json([
                'message' => 'Món ăn đã được xóa thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Xóa món ăn thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
