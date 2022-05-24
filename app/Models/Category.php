<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    protected $fillable = ['id', 'user_id','parent_id', 'slug', 'category_image', 'type'];

    public $translatedAttributes = ['name'];

    protected $translationForeignKey = 'cat_id';

    public $timestamps = true;

    public function getCategoryImageAttribute(){
        return $this->attributes['category_image'] = get_avatar_url($this->attributes['category_image']);
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function category_translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CategoryTranslation::class, 'cat_id', 'id');
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'category_product', 'cat_id', 'prod_id');
    }
}
