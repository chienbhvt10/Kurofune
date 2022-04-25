<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorProfileTranslation extends Model
{
    use HasFactory;

    public $fillable = [
        'id',
        'vendor_id',
        'locate',
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

    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    public function vendor_profile(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(VendorProfile::class, 'vendor_profile_id', 'id');
    }
}
