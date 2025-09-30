<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(CreateUserRequest $request)
    {
        $user = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'birthday' => $request->birthday,
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công!',
            'user' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        
        if(!filter_var($request->email, FILTER_VALIDATE_EMAIL)){
            $user = User::where('user_name', $request->email)->first();
            if ($user && Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Đăng nhập admin thành công!',
                    'role'    => 'admin',
                    'user'    =>  $user
                ], 200);
            }
        }else{
            $customer = Customer::where('email', $request->email)->first();
            if ($customer && Hash::check($request->password, $customer->password)) {
                return response()->json([
                    'message'  => 'Đăng nhập Customer thành công!',
                    'role'     => 'customer',
                    'customer' => $customer
                ], 200);
            }
        }
        return response()->json([
            'message' => 'Sai email hoặc mật khẩu!'
        ], 401);
    }
}
