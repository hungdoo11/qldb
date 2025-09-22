<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }


    protected $fillable = ['table_id', 'customer_name', 'phone', 'status', 'total_price'];
}
