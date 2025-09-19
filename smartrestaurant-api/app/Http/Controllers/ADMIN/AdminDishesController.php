<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Dishes;
use Illuminate\Http\Request;

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
}
