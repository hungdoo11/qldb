<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Dishes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DishController extends Controller
{
    // Lấy tất cả món ăn
    public function index()
    {
        $dishes = Dishes::with('category')->get();

        return response()->json($dishes);
    }


    // ✅ Thêm món ăn
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'quantity' => 'required|integer',
            'category_id' => 'required|integer', // ✅
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
            'image' => $imageName
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
        $dish->update($request->all());
        return response()->json($dish);
    }

    public function destroy($id)
    {
        $dish = Dishes::findOrFail($id);
        $dish->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
