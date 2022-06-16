<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Scopes\OrderByCreatedAtScope;

class Tax extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'value'];
    protected $table = 'taxes';
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
    
    public function product(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Product::class, 'tax_id', 'id');
    }
}
