<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;


Route::apiResource('dishes', DishController::class);
Route::apiResource('users', UserController::class);

// routes/api.php

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::put('/orders/{id}/confirm', [OrderController::class, 'confirm']);
Route::put('/orders/{id}/complete', [OrderController::class, 'complete']);
Route::put('/orders/{id}/cancel', [OrderController::class, 'cancel']);



Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel 11 API 🚀'
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AuthController::class, 'loginAdmin']);


// Route::get('/dishes', [DishController::class, 'index']);
// Route::post('/dishes', [DishController::class, 'store']); // 👉 thêm món


Route::get('/categories', [CategoryController::class, 'index']);

// Route::get('/users', [UserController::class, 'index']);
