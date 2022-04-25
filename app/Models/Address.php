<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'user_id', 'full_name', 'postal_code', 'city', 'prefecture', 'street_address', 'building', 'phone'];
    public $timestamps = true;
}
