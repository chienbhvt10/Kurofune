<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Scopes\OrderByCreatedAtScope;

class CartItem extends Model
{
    use HasFactory;

    protected $primaryKey = "id";

    public $incrementing = false;

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
        'anket_8',
    ];

    public $timestamps = true;

    protected static function booted()
    {
        static::addGlobalScope(new OrderByCreatedAtScope);
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */
    public function cart(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Cart::class, 'cart_id', 'id');
    }

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
