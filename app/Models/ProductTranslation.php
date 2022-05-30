<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductTranslation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['id', 'product_id', 'locale', 'name', 'medicinal_efficacy_classification', 'features', 'precautions', 'efficacy_effect', 'usage_dose', 'active_ingredients', 'additives', 'precautions_storage_handling', 'manufacturer'];

    public $timestamps = true;

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
