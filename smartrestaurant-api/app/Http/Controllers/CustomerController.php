<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
     public function index()
    {
        $customers = Customer::all();  
        return response()->json($customers); 
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        $customer->update($validated);

        return response()->json($customer, 200);
    }

    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $customer->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
