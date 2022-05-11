<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'id',
        'user_id',
        'vendor_profile_id',
        'transaction_id',
        'status',
        'shipping_method_id',
        'payment_method_id',
        'total',
        'total_tax',
        'shipping_full_name',
        'shipping_postal_code',
        'shipping_city',
        'shipping_prefecture',
        'shipping_street_address',
        'shipping_building',
        'shipping_phone',
        'shipping_email',
        'billing_full_name',
        'billing_postal_code',
        'billing_city',
        'billing_prefecture',
        'billing_street_address',
        'billing_building',
        'billing_phone',
        'billing_email',
    ];

    public $timestamps = true;
}
