<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryTranslation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['id', 'cat_id', 'locate', 'name'];

    public $timestamps = true;
}
