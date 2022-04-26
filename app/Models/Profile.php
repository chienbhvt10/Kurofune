<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id',
        'name',
        'dob',
        'gender',
        'phone',
        'facebook',
        'line',
        'address',
        'nationality',
        'visa_type',
        'job_name',
        'company_representative',
        'inflow_source',
        'payment',
        'insurance_status',
        'insurance_support',
        'insurance_start_date',
        'overseas_remittance_status',
        'orientation',
        'start_date_education',
        'end_date_education',
        'education_status',
        'wabisabi_my_page_registration',
    ];

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
}
