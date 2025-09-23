<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminCategoryController extends Controller
{
    public function update(Request $request, $id){
        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->name
        ]);
        return response()->json('Cập nhật phân loại thành công.');
    }
    
    public function destroy($id){
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json('Xoá phân loại thành công.');
    }
}
