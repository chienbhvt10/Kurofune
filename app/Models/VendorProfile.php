<?php

namespace App\Models;

use Astrotomic\Translatable\Translatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class VendorProfile extends Model implements HasMedia
{
    use HasFactory, Translatable, InteractsWithMedia;

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

    protected $fillable = ['id'];

    public $timestamps = true;

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
}
