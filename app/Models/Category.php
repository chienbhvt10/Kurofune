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

    public function translation(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CategoryTranslation::class, 'cat_id', 'id');
    }
}
