<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorProfile extends Model
{
    use HasFactory, Translatable;

    public $translatedAttributes = [
        'name',
        'permit_classification',
        'founder',
        'items_stated_permit',
        'management_pharmacist',
        'pharmacist_working',
        'registered_seller_working',
        'drugs_handled',
        'distinguishing_by_name',
        'business_hours',
        'consultation_hours',
        'contact_information',
        'currently_working',
        'open_sale_time',
        'time_order_outside',
        'expiration_date_of_drugs',
    ];

    protected $fillable = ['id', 'images_inside', 'images_outside'];

    public $timestamps = true;

    public function getImagesOutsideAttribute()
    {
        $images_outside = get_multiple_image($this->attributes['images_outside']);
        return $images_outside;
    }

    public function getImagesInsideAttribute()
    {
        $images_inside = get_multiple_image($this->attributes['images_inside']);
        return $images_inside;
    }

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function vendor_profile_translations(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(VendorProfileTranslation::class, 'vendor_profile_id', 'id');
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class, 'vendor_profile_id', 'id');
    }
}
