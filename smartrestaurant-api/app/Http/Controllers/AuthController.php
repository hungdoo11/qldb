<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Đăng ký
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'level' => 3 // 👉 mặc định user
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công!',
            'user' => $user
        ], 201);
    }


    // Đăng nhập
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Sai email hoặc mật khẩu!'
            ], 401);
        }

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'user' => $user
        ], 200);
    }
    public function loginAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Sai email hoặc mật khẩu!'
            ], 401);
        }

        if ($user->level != 1) {
            return response()->json([
                'message' => 'Tài khoản này không phải Admin!'
            ], 403);
        }

        return response()->json([
            'message' => 'Admin đăng nhập thành công!',
            'user' => $user
        ], 200);
    }
}
