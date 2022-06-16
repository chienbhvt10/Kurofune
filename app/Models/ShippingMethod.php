<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Scopes\OrderByCreatedAtScope;

class ShippingMethod extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['id', 'name', 'total', 'description', 'logo'];

    public function getLogoAttribute(){
        return $this->attributes['logo'] = get_image_url($this->attributes['logo']);
    }

    public $timestamps = true;

    protected static function booted()
    {
        static::addGlobalScope(new OrderByCreatedAtScope);
    }
}
