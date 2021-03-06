<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Scopes\OrderByCreatedAtScope;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'username',
        'name',
        'email',
        'phone',
        'password',
        'avatar',
        'active',
        'login_counter'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public $timestamps = true;

    protected $guard_name = 'api';

    public function getAvatarAttribute(){
        return $this->attributes['avatar'] = get_avatar_url($this->attributes['avatar']);
    }

    /*
    |--------------------------------------------------------------------------
    | override sendPasswordResetNotification
    |--------------------------------------------------------------------------
    */

    public function sendPasswordResetNotification($token)
    {

        $url = url('reset-password?token='.$token. '&email=' .$this->email);

        $this->notify(new ResetPasswordNotification($url));
    }

    /*
    |--------------------------------------------------------------------------
    | SCOPES
    |--------------------------------------------------------------------------
    */

    public function scopeActiveStatus($query, $type)
    {
        $query->where('active', $type);
    }

    protected static function booted()
    {
        static::addGlobalScope(new OrderByCreatedAtScope);
    }


    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function profile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Profile::class, 'user_id', 'id');
    }

    public function address(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Address::class, 'user_id', 'id');
    }

    public function shipping_address(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ShippingAddress::class, 'user_id', 'id');
    }

    public function billing_address(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(BillingAddress::class, 'user_id', 'id');
    }

    public function vendor_profile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(VendorProfile::class, 'user_id', 'id');
    }

    public function pages(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Page::class, 'author_id', 'id');
    }

    public function categories(): \Illuminate\Database\Eloquent\Relations\hasMany
    {
        return $this->hasMany(Category::class, 'user_id', 'id');
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Product::class, 'user_id', 'id');
    }

    public function cart(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Cart::class, 'user_id', 'id');
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class, 'user_id', 'id');
    }

    protected static $relations_to_cascade = ['profile', 'address', 'shipping_address', 'billing_address', 'vendor_profile', 'cart'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function($resource) {
            foreach (static::$relations_to_cascade as $relation) {
                foreach ($resource->{$relation}()->get() as $item) {
                    $item->delete();
                }
            }
        });
    }
}
