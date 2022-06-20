<?php

namespace App\Models;

use App\Traits\ProductTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Scopes\OrderByCreatedAtScope;

class Order extends Model
{
    use HasFactory, SoftDeletes, ProductTrait;

    protected $fillable = [
        'id',
        'order_number',
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

    protected $appends = ['total', 'total_tax'];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope(new OrderByCreatedAtScope);
    }

//    public function getOrderNumberAttribute(): string
//    {
//        return $this->get_order_number($this->id);
//    }

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
    | SCOPES
    |--------------------------------------------------------------------------
    */

    public function scopeStatus($query, $request)
    {
        if ($request->has('status')) {
            $query->whereHas('transaction', function ($q) use ($request) {
                $q->select(['status']);
                $q->where('status', '=', $request->status);
            });
        }
        return $query;
    }

    public function scopeOrderNumber($query, $request)
    {
        if($request->has('order_number')) {
            $query->where('order_number', $request->order_number);
        }
//        dd($query->toSql());
        return $query;
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'order_product', 'order_id', 'product_id')->withPivot(['product_name', 'quantity', 'anket_1', 'anket_2', 'anket_3', 'anket_4', 'anket_5', 'anket_6', 'anket_7', 'anket_8', 'sub_total_tax', 'sub_total', 'total_tax','total']);
    }

    public function transaction(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Transaction::class, 'order_id', 'id');
    }

    public function vendor_profile(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(VendorProfile::class, 'vendor_profile_id', 'id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
