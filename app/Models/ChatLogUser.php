<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use App\Scopes\OrderByCreatedAtScope;

class ChatLogUser extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'cpid', 'user_id', 'data_log'];

    public $timestamps = true;

    protected static function booted()
    {
        static::addGlobalScope(new OrderByCreatedAtScope);
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
