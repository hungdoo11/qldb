<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Dishes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminDishesController extends Controller
{
    public function update(Request $request, $id)
    {
        $dish = Dishes::findOrFail($id);
        $request->validate([
            'name' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric',
            'quantity' => 'sometimes|required|integer',
            'category_id' => 'sometimes|required|integer',
            'status' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
        
        $data = $request->only(['name', 'price', 'quantity', 'category_id', 'status', 'description']);

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->getClientOriginalName();
            $request->file('image')->storeAs('images', $imageName, 'public');
            $data['image'] = 'storage/images/' . $imageName;
        }

        $dish->update($data);

        return response()->json($dish);
    }
      public function destroy($id)
    {
        try {
            $dish = Dishes::findOrFail($id);

            if ($dish->image && Storage::disk('public')->exists(str_replace('storage/', '', $dish->image))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $dish->image));
            }

            $dish->delete();

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
