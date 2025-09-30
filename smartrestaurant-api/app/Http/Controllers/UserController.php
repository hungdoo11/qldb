<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'user_name' => $request->user_name,
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công!',
            'user' => $user
        ], 200);
    }
    public function index()
    {
        $users = User::all();  
        return response()->json($users); 
    }

    public function update(Request $request, $id)
    {
      $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'user_name' => 'required|string|max:255',
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|string|max:50',
        ]);

      $user->update($validated);

        return response()->json($user, 200);
    }

    public function destroy($id)
    {
      $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

      $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
    
}
