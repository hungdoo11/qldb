<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];

    public function dishes()
    {
        return $this->hasMany(Dishes::class, 'category_id');
    }
}
