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
        'product_name',
        'order_id',
        'quantity',
        'anket_1',
        'anket_2',
        'anket_3',
        'anket_4',
        'anket_5',
        'anket_6',
        'anket_7',
        'anket_8',
        'sub_total',
        'sub_total_tax',
        'total',
        'total_tax',
    ];

    public $timestamps = true;

}
