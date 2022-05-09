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
        return $this->belongsToMany(Category::class, 'category_product', 'product_id', 'category_id');
    }
}
