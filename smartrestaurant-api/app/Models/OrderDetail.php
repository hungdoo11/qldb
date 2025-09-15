<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    public function dish()
    {
        return $this->belongsTo(Dishes::class);
    }

    protected $fillable = ['order_id', 'dish_id', 'quantity', 'price'];
}
