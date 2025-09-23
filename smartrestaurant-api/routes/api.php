<?php

use App\Http\Controllers\ADMIN\AdminCategoryController;
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
Route::apiResource('admin/dishes', AdminDishesController::class);


// Route::post('/orders', [OrderController::class, 'store']);
// Route::get('/orders', [OrderController::class, 'index']);
// Route::get('/orders/{id}', [OrderController::class, 'show']);
// Route::put('/orders/{id}/confirm', [OrderController::class, 'confirm']);
// Route::put('/orders/{id}/complete', [OrderController::class, 'complete']);
// Route::put('/orders/{id}/cancel', [OrderController::class, 'cancel']);



Route::get('/hello', function () {
    return response()->json([
        'message' => 'Hello from Laravel 11 API 🚀'
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::get('/dishes', [DishController::class, 'index']);
Route::get('/dishes/category/{id}', [DishController::class, 'dishesCategory']);





Route::get('/dishes/{id}', [DishController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);


Route::prefix('admin')->group(function () {
    //dishes
    Route::post('/dishes', [AdminDishesController::class, 'store']);
    Route::post('/dishes/{id}', [AdminDishesController::class, 'update']);
    Route::delete('/dishes/{id}', [AdminDishesController::class, 'destroy']);
    Route::get('/dishes/{id}', [AdminDishesController::class, 'show']);
    //customer
    Route::get('/customer', [AdminCustomerController::class, 'index']);
    Route::put('/customer/{id}', [AdminCustomerController::class, 'update']);
    //table
    Route::apiResource('tables', AdminTableController::class);

    //statictical
    Route::get('/statistical-renuve', [AdminOrderController::class, 'renuve']);
    Route::get('/statistical-order-by-day', [AdminOrderController::class, 'orderByDay']);
    Route::get('/statistical-revenue-by-day', [AdminOrderController::class, 'revenueByDay']);
    //order
    Route::get('/order', [AdminOrderController::class, 'index']);
    //category
     Route::put('/category/{id}', [AdminCategoryController::class, 'update']);
     Route::get('/category/{id}', [AdminCategoryController::class, 'show']);
     Route::delete('/category/{id}', [AdminCategoryController::class, 'destroy']);

});

// test

Route::get('/users/{id}/orders', [OrderController::class, 'getOrdersByUser']);
