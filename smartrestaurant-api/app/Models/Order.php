<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function details()
    {
        return $this->hasMany(OrderDetail::class)->select('order_id','dish_id', 'quantity', 'price', 'note');
    }
    public function table()
    {
        return $this->belongsTo(Table::class, 'table_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->select('id','name', 'role');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    protected $fillable = ['table_id', 'customer_id', 'user_id', 'status', 'total_amount', 'order_time', 'discount_method', 'final_amount'];
}
