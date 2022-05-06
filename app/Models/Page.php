<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use HasFactory, Translatable, SoftDeletes;

    protected $fillable = ['id', 'author_id', 'slug', 'image', 'meta_title', 'meta_description', 'meta_keywords'];

    public $translatedAttributes = ['title', 'content'];

    public $timestamps = true;

    /*
        |--------------------------------------------------------------------------
        | RELATIONS
        |--------------------------------------------------------------------------
        */

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id', 'id');
    }

    public function page_translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(PageTranslation::class, 'page_id', 'id');
    }
}
