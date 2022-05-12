<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShippingMethod extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['id', 'name', 'total', 'description', 'logo'];

    public function getLogoAttribute(){
        return $this->attributes['logo'] = get_avatar_url($this->attributes['logo']);
    }

    public $timestamps = true;
}
