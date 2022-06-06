<?php

namespace App\Models;

use App\Traits\ProductTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes, ProductTrait;

    protected $fillable = [
        'id',
        'user_id',
        'vendor_profile_id',
        'shipping_method_id',
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

    protected $appends = ['order_number', 'total', 'total_tax'];

    public function getOrderNumberAttribute(): string
    {
        return $this->get_order_number($this->id);
    }

    public function getTotalAttribute(): string
    {
        return $this->get_price_html($this->products->sum('pivot.total'));
    }

    public function getTotalTaxAttribute(): string
    {
        return $this->get_price_html($this->products->sum('pivot.total_tax'));
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_product', 'order_id', 'product_id')->withPivot(['quantity', 'anket_1', 'anket_2', 'anket_3', 'anket_4', 'anket_5', 'anket_6', 'anket_7', 'sub_total_tax', 'sub_total', 'total_tax','total']);
    }

    public function transaction(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Transaction::class, 'order_id', 'id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
