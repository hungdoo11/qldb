<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
   protected $fillable = [
        'amount',
        'method',
        'payment_time',
        'order_id',
      
    ];
}
