<?php

use App\Http\Controllers\ADMIN\AdminCustomerController;
use App\Http\Controllers\ADMIN\AdminDishesController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminTableController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;


Route::apiResource('users', UserController::class);


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


Route::get('/dishes', [DishController::class, 'index']);


Route::get('/categories', [CategoryController::class, 'index']);

Route::prefix('admin')->group(function () {
    //dishes
    Route::post('/dishes', [DishController::class, 'store']);
    Route::post('/dishes/{id}', [AdminDishesController::class, 'update']);

    //customer
    Route::get('/customer', [AdminCustomerController::class, 'index']);
    Route::put('/customer/{id}', [AdminCustomerController::class, 'update']);
    
    Route::get('/tables', [AdminTableController::class, 'index']);
    Route::apiResource('tables', AdminTableController::class);
    Route::get('/statistical-renuve', [AdminOrderController::class, 'renuve']);
});
