<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'cart_id',
        'product_id',
        'quantity',
        'anket_1',
        'anket_2',
        'anket_3',
        'anket_4',
        'anket_5',
        'anket_6',
        'anket_7',
    ];

    public $timestamps = true;
}
