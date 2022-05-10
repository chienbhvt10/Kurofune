<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BillingAddress extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['id', 'user_id', 'full_name', 'postal_code', 'city', 'prefecture', 'street_address', 'building', 'phone', 'email'];
    public $timestamps = true;
}
