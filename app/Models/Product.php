<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    public $translatedAttributes = ['medicinal_efficacy_classification', 'features', 'precautions', 'efficacy_effect', 'usage_dose', 'active_ingredients', 'additives', 'precautions_storage_handling', 'manufacturer'];

    protected $fillable = [
        'id',
        'user_id',
        'slug',
        'name',
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
}
