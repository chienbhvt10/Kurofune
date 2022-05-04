<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatLogUser extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'cpid', 'user_id', 'data_log'];

    public $timestamps = true;
}
