<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Scopes\OrderByCreatedAtScope;

class Category extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    protected $fillable = ['id', 'user_id','parent_id', 'slug', 'category_image', 'type'];

    public $translatedAttributes = ['name'];

    protected $translationForeignKey = 'cat_id';

    public $timestamps = true;

    protected $appends = [
        'allow_deleted'
    ];

    protected static function booted()
    {
        static::addGlobalScope(new OrderByCreatedAtScope);
    }

    public function getCategoryImageAttribute(){
        return $this->attributes['category_image'] = get_image_url($this->attributes['category_image']);
    }

    public function getAllowDeletedAttribute(){
        try {
            $cate_id = $this->attributes['id'];
            $res = Product::whereHas('categories', function (Builder $query) use ($cate_id){
                $query->where('categories.id','=', $cate_id)->withoutGlobalScope(OrderByCreatedAtScope::class);
            })->where('status', 'publish')->withoutGlobalScope(OrderByCreatedAtScope::class)->firstOrFail();
            return $this->attributes['allow_delete'] = false;
        }catch (\Exception $error){
            return $this->attributes['category_image'] = true;
        }
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
