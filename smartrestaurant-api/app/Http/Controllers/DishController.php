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


    public function show($id)
    {
        $dish = Dishes::findOrFail($id);
        return response()->json($dish);
    }

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

        $data = $request->only(['name', 'price', 'quantity', 'category_id', 'status']);

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
        $dish = Dishes::findOrFail($id);
        $dish->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
