<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'product_id',
        'order_id',
        'quantity',
        'sub_total',
        'sub_total_tax',
        'total',
        'total_tax',
    ];

    public $timestamps = true;

}
