<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    public $translatedAttributes = ['name', 'medicinal_efficacy_classification', 'features', 'precautions', 'efficacy_effect', 'usage_dose', 'active_ingredients', 'additives', 'precautions_storage_handling', 'manufacturer'];

    protected $fillable = [
        'id',
        'user_id',
        'slug',
        'sku',
        'stock_status',
        'price',
        'status',
        'product_image',
        'tax_id',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    public $timestamps = true;

    public function getProductImageAttribute(){
        return $this->attributes['product_image'] = get_image_url($this->attributes['product_image']);
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    public function scopeProductStatus($query, $type)
    {
        $query->where('status', $type);
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function categories(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_product', 'prod_id', 'cat_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function cart_item(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(CartItem::class, 'product_id', 'id');
    }

    public function tax(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Tax::class, 'tax_id', 'id');
    }

    public function product_translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductTranslation::class, 'product_id', 'id');
    }

    public function order(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_product','order_id','product_id');
    }
}
