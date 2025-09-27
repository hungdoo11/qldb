<?php

namespace App\Http\Controllers\ADMIN;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminCustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Customer::all();
    }
    
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $user = Customer::findOrFail($id);
        $user->name = $data['name'];
        $user->type = $data['type'];
        $user->points = $data['points'];
        $user->email = $data['email'];
        $user->phone = $data['phone'];
        $user->birthday = $data['birthday'];
        $user->note = $data['note'] ?? "";
        $user->save();
        return response()->json([
            'message' => 'Cập nhật thành công!',
            'data' => $user
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
