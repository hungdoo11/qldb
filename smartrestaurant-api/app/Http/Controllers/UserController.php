<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        // Lấy tất cả user trừ Admin
        $users = User::where('level', '!=', 1)->get();

        return response()->json($users);
    }
}
