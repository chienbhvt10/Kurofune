<?php

namespace App\Http\Controllers\API;

use App\Enums\Base;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\WithoutSpaces;
use App\Traits\RespondsStatusTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use RespondsStatusTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $role = $request->role ?? null;
            $posts_per_page = config('constants.pagination.items_per_page');
            if($role) {
                $users = User::whereHas('roles', function ($query) use($role) {
                    return $query->where('name', '=', $role);
                })->with(['roles', 'vendor_profile', 'profile', 'shipping_address', 'billing_address'])->paginate($posts_per_page);
            }else {
                $users = User::with(['roles','vendor_profile', 'profile', 'address', 'billing_address', 'shipping_address'])->paginate($posts_per_page);
            }
            return $this->responseData($users);
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $roles = Role::all()->pluck('name')->toArray();
            $validator = Validator::make($request->all(), [
                'username' => 'required|alpha_dash|unique:users',
                'name' => 'required',
                'email' => 'email|required|unique:users',
                'phone' => 'numeric',
                'password' => [
                    'required',
                    'string',
                    new WithoutSpaces,
                    Password::min(8)
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
                ],
                'active' => 'required|boolean',
                'avatar' => 'nullable|string',
                'role' => ['required', 'string', Rule::in($roles)],
                'full_name' => 'string|max:100',
                'postal_code' => 'nullable|string|max:50',
                'city' => 'nullable|string|max:255',
                'prefecture' => 'nullable|string|max:150',
                'street_address' => 'nullable|string|max:255',
                'building' => 'nullable|string|max:255',
                'shipping_address.full_name' => 'nullable|string|max:100',
                'shipping_address.postal_code' => 'nullable|string|max:50',
                'shipping_address.city' => 'nullable|string|max:255',
                'shipping_address.prefecture' => 'nullable|string|max:150',
                'shipping_address.street_address' => 'nullable|string|max:255',
                'shipping_address.building' => 'nullable|string|max:255',
                'shipping_address.phone' => 'nullable|numeric',
                'shipping_address.email' => 'nullable|email',
                'billing_address.full_name' => 'nullable|string|max:100',
                'billing_address.postal_code' => 'nullable|string|max:50',
                'billing_address.city' => 'nullable|string|max:255',
                'billing_address.prefecture' => 'nullable|string|max:150',
                'billing_address.street_address' => 'nullable|string|max:255',
                'billing_address.building' => 'nullable|string|max:255',
                'billing_address.phone' => 'nullable|numeric',
                'billing_address.email' => 'nullable|email',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
            $username = $request->username;
            $name = $request->name;
            $email = $request->email;
            $phone = $request->phone;
            $password = $request->password;
            $active = (boolean)$request->password;
            $role = $request->role;
            $file_avatar = $request->avatar;
            $filename = save_base_64_image($file_avatar, 'avatar');

            $data = [
                'username' => $username,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'password' => Hash::make($password),
                'active' => $active,
                'avatar' => $filename
            ];
            $get_role = Role::findByName($role, 'api');
            $user = User::create($data);
            $user->assignRole($get_role);

            $user->address()->create([
                'postal_code' => $request->postal_code ?? null,
                'city' => $request->city ?? null,
                'prefecture' => $request->prefecture ?? null,
                'street_address' => $request->street_address ?? null,
                'building' => $request->building ?? null,
            ]);

            $user->shipping_address()->create([
                'full_name' => $request->shipping_address['full_name'] ?? null,
                'postal_code' => $request->shipping_address['postal_code'] ?? null,
                'city' => $request->shipping_address['city'] ?? null,
                'prefecture' => $request->shipping_address['prefecture'] ?? null,
                'street_address' => $request->shipping_address['street_address'] ?? null,
                'building' => $request->shipping_address['building'] ?? null,
                'phone' => $request->shipping_address['phone'] ?? null,
                'email' => $request->shipping_address['email'] ?? null,
            ]);

            $user->billing_address()->create([
                'full_name' => $request->billing_address['full_name'] ?? null,
                'postal_code' => $request->billing_address['postal_code'] ?? null,
                'city' => $request->billing_address['city'] ?? null,
                'prefecture' => $request->billing_address['prefecture'] ?? null,
                'street_address' => $request->billing_address['street_address'] ?? null,
                'building' => $request->billing_address['building'] ?? null,
                'phone' => $request->billing_address['phone'] ?? null,
                'email' => $request->billing_address['email'] ?? null,
            ]);

            if($role == UserRole::ROLE_FULL_SUPPORT_PLAN || $role == UserRole::ROLE_LIGHT_PLAN) {
                $validator_profile = Validator::make($request->all(), [
                    'dob' => 'nullable|date|date_format:Y-m-d',
                    'gender' => 'nullable|boolean',
                    'payment' => 'nullable|boolean',
                    'insurance_status' => 'nullable|numeric',
                    'overseas_remittance_status' => 'nullable|boolean',
                    'start_date_education' => 'nullable|date|date_format:Y-m-d',
                    'end_date_education' => 'nullable|date|date_format:Y-m-d',
                    'wabisabi_my_page_registration' => 'nullable|boolean',

                ]);
                if ($validator_profile->fails()) {
                    DB::rollBack();
                    $errors = $validator_profile->errors();
                    return $this->errorResponse($errors, 422);
                }
                $dob = $request->dob ?? null;
                $gender = (boolean)$request->gender;
                $facebook = $request->facebook ?? null;
                $line = $request->line ?? null;
                $address = $request->address ?? null;
                $nationality = $request->nationality ?? null;
                $visa_type = $request->visa_type ?? null;
                $job_name = $request->job_name ?? null;
                $company_representative = $request->company_representative ?? null;
                $inflow_source = $request->inflow_source ?? null;
                $payment = (int)$request->payment ?? null;
                $insurance_status = $request->insurance_status ?? null;
                $insurance_support = $request->insurance_support ?? null;
                $insurance_start_date = $request->insurance_start_date ?? null;
                $overseas_remittance_status = (int)$request->insurance_start_date ?? null;
                $orientation = $request->orientation ?? null;
                $start_date_education = $request->start_date_education ?? null;
                $end_date_education = $request->end_date_education ?? null;
                $education_status = (int)$request->education_status ?? null;
                $wabisabi_my_page_registration = (int)$request->wabisabi_my_page_registration ?? null;
                $user->profile()->create([
                    'dob' => $dob,
                    'gender' => $gender,
                    'facebook' => $facebook,
                    'line' => $line,
                    'address' => $address,
                    'nationality' => $nationality,
                    'visa_type' => $visa_type,
                    'job_name' => $job_name,
                    'company_representative' => $company_representative,
                    'inflow_source' => $inflow_source,
                    'payment' => $payment,
                    'insurance_status' => $insurance_status,
                    'insurance_support' => $insurance_support,
                    'insurance_start_date' => $insurance_start_date,
                    'overseas_remittance_status' => $overseas_remittance_status,
                    'orientation' => $orientation,
                    'start_date_education' => $start_date_education,
                    'end_date_education' => $end_date_education,
                    'education_status' => $education_status,
                    'wabisabi_my_page_registration' => $wabisabi_my_page_registration,
                ]);
            }elseif ($role == UserRole::ROLE_VENDOR) {
                $validator_vendor = Validator::make($request->all(), [
                    'images_outside' => 'nullable|array',
                    'images_outside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                    'images_inside' => 'nullable|array',
                    'images_inside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
                ]);
                if ($validator_vendor->fails()) {
                    DB::rollBack();
                    $errors = $validator_vendor->errors();
                    return $this->errorResponse($errors, 422);
                }
                $images_outside = $request->images_outside ?? null;
                $images_inside = $request->images_inside ?? null;

                $data_vendor = [
                    'en' => [
                        'name' => $request->en['name'] ?? null,
                        'permit_classification' => $request->en['permit_classification'] ?? null,
                        'founder' => $request->en['founder'] ?? null,
                        'items_stated_permit' => $request->en['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->en['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->en['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->en['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->en['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->en['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->en['business_hours'] ?? null,
                        'consultation_hours' => $request->en['consultation_hours'] ?? null,
                        'contact_information' => $request->en['contact_information'] ?? null,
                        'currently_working' => $request->en['currently_working'] ?? null,
                        'open_sale_time' => $request->en['open_sale_time'] ?? null,
                        'time_order_outside' => $request->en['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->en['expiration_date_of_drugs'] ?? null,
                    ],
                    'ja' => [
                        'name' => $request->ja['name'] ?? null,
                        'permit_classification' => $request->ja['permit_classification'] ?? null,
                        'founder' => $request->ja['founder'] ?? null,
                        'items_stated_permit' => $request->ja['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->ja['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->ja['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->ja['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->ja['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->ja['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->ja['business_hours'] ?? null,
                        'consultation_hours' => $request->ja['consultation_hours'] ?? null,
                        'contact_information' => $request->ja['contact_information'] ?? null,
                        'currently_working' => $request->ja['currently_working'] ?? null,
                        'open_sale_time' => $request->ja['open_sale_time'] ?? null,
                        'time_order_outside' => $request->ja['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->ja['expiration_date_of_drugs'] ?? null,
                    ],
                    'vi' => [
                        'name' => $request->vi['name'] ?? null,
                        'permit_classification' => $request->vi['permit_classification'] ?? null,
                        'founder' => $request->vi['founder'] ?? null,
                        'items_stated_permit' => $request->vi['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->vi['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->vi['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->vi['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->vi['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->vi['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->vi['business_hours'] ?? null,
                        'consultation_hours' => $request->vi['consultation_hours'] ?? null,
                        'contact_information' => $request->vi['contact_information'] ?? null,
                        'currently_working' => $request->vi['currently_working'] ?? null,
                        'open_sale_time' => $request->vi['open_sale_time'] ?? null,
                        'time_order_outside' => $request->vi['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->vi['expiration_date_of_drugs'] ?? null,
                    ],
                    'tl' => [
                        'name' => $request->tl['name'] ?? null,
                        'permit_classification' => $request->tl['permit_classification'] ?? null,
                        'founder' => $request->tl['founder'] ?? null,
                        'items_stated_permit' => $request->tl['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->tl['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->tl['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->tl['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->tl['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->tl['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->tl['business_hours'] ?? null,
                        'consultation_hours' => $request->tl['consultation_hours'] ?? null,
                        'contact_information' => $request->tl['contact_information'] ?? null,
                        'currently_working' => $request->tl['currently_working'] ?? null,
                        'open_sale_time' => $request->tl['open_sale_time'] ?? null,
                        'time_order_outside' => $request->tl['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->tl['expiration_date_of_drugs'] ?? null,
                    ],
                    'zh' => [
                        'name' => $request->zh['name'] ?? null,
                        'permit_classification' => $request->zh['permit_classification'] ?? null,
                        'founder' => $request->zh['founder'] ?? null,
                        'items_stated_permit' => $request->zh['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->zh['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->zh['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->zh['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->zh['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->zh['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->zh['business_hours'] ?? null,
                        'consultation_hours' => $request->zh['consultation_hours'] ?? null,
                        'contact_information' => $request->zh['contact_information'] ?? null,
                        'currently_working' => $request->zh['currently_working'] ?? null,
                        'open_sale_time' => $request->zh['open_sale_time'] ?? null,
                        'time_order_outside' => $request->zh['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->zh['expiration_date_of_drugs'] ?? null,
                    ],
                ];

                $vendor = $user->vendor_profile()->create($data_vendor);
                if($images_outside) {
                    $vendor->addMultipleMediaFromRequest(['images_outside'])->each(function ($fileAdder) {
                        $fileAdder->toMediaCollection('images_outside');
                    });
                }
                if($images_inside) {
                    $vendor->addMultipleMediaFromRequest(['images_inside'])->each(function ($fileAdder) {
                        $fileAdder->toMediaCollection('images_inside');
                    });
                }
            }

            DB::commit();
            return $this->successWithData(__('message.user.created'), $user );
        }catch (\Exception $error){
            DB::rollBack();
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $id)
    {
        try {
            $user = User::with(['roles','vendor_profile', 'profile', 'address', 'billing_address', 'shipping_address'])->find($id);
            if(!$user) {
                return $this->errorResponse(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $role = $user->roles;
            $profile = $user->profile;
            $address = $user->address;
            $billing_address = $user->billing_address;
            $shipping_address = $user->shipping_address;
            $vendor_profile_data = null;
            $vendor_profile = $user->vendor_profile;
            if($vendor_profile){
                $images_outside = getMediaImages($vendor_profile, 'images_outside');
                $images_inside = getMediaImages($vendor_profile, 'images_inside');

                $vendor_profile_data = [
                    'id' => $vendor_profile->id,
                    'vendor_translations' => $vendor_profile->translations,
                    'images_outside' => $images_outside,
                    'images_inside' => $images_inside,
                ];
            }

            $response = [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'phone' => $user->phone,
                'active' => $user->active,
                'avatar' => $user->avatar,
                'role' => $role,
                'profile' => $profile,
                'vendor_profile' => $vendor_profile_data,
                'address' => $address,
                'billing_address' => $billing_address,
                'shipping_address' => $shipping_address,
            ];
            return $this->responseData($response);
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $user = User::find($id);
            if(!$user) {
                return $this->errorResponse(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $roles = Role::all()->pluck('name')->toArray();
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'email|required',
                'phone' => 'numeric|required',
                'password' => [
                    'string',
                    new WithoutSpaces,
                    Password::min(8)
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
                ],
                'active' => 'required|boolean',
                'avatar' => 'nullable|string',
                'role' => ['required', 'string', Rule::in($roles)],
                'full_name' => 'nullable|string|max:100',
                'postal_code' => 'nullable|string|max:50',
                'city' => 'nullable|string|max:255',
                'prefecture' => 'nullable|string|max:150',
                'street_address' => 'nullable|string|max:255',
                'building' => 'nullable|string|max:255',
                'shipping_address.full_name' => 'nullable|string|max:100',
                'shipping_address.postal_code' => 'nullable|string|max:50',
                'shipping_address.city' => 'nullable|string|max:255',
                'shipping_address.prefecture' => 'nullable|string|max:150',
                'shipping_address.street_address' => 'nullable|string|max:255',
                'shipping_address.building' => 'nullable|string|max:255',
                'shipping_address.phone' => 'nullable|numeric',
                'shipping_address.email' => 'nullable|email',
                'billing_address.full_name' => 'nullable|string|max:100',
                'billing_address.postal_code' => 'nullable|string|max:50',
                'billing_address.city' => 'nullable|string|max:255',
                'billing_address.prefecture' => 'nullable|string|max:150',
                'billing_address.street_address' => 'nullable|string|max:255',
                'billing_address.building' => 'nullable|string|max:255',
                'billing_address.phone' => 'nullable|numeric',
                'billing_address.email' => 'nullable|email',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
            $name = $request->name;
            $email = $request->email;
            $phone = $request->phone;
            $password = $request->password ?? null;
            $active = (boolean)$request->active;
            $role = $request->role;
            $file_avatar = $request->avatar ?? null;
            if($file_avatar) {
                $filename = save_base_64_image($file_avatar);
                $user->avatar = $filename;
            }
            $get_role = Role::findByName($role, 'api');
            $user->syncRoles($get_role);
            $user->name = $name;
            $user->email = $email;
            $user->phone = $phone;
            if($password) {
                $validator = Validator::make($request->all(), [
                    'password' => [
                        'string',
                        new WithoutSpaces,
                        Password::min(8)
                            ->mixedCase()
                            ->numbers()
                            ->symbols()
                    ]
                ]);
                if ($validator->fails()) {
                    DB::rollBack();
                    $errors = $validator->errors();
                    return $this->errorResponse($errors, 422);
                }
                $user->password = Hash::make($password);
            }
            $user->active = $active;
            $user->save();
            $user->address()->update([
                'postal_code' => $request->postal_code ?? null,
                'city' => $request->city ?? null,
                'prefecture' => $request->prefecture ?? null,
                'street_address' => $request->street_address ?? null,
                'building' => $request->building ?? null,
            ]);

            $user->shipping_address()->update([
                'full_name' => $request->shipping_address['full_name'] ?? null,
                'postal_code' => $request->shipping_address['postal_code'] ?? null,
                'city' => $request->shipping_address['city'] ?? null,
                'prefecture' => $request->shipping_address['prefecture'] ?? null,
                'street_address' => $request->shipping_address['street_address'] ?? null,
                'building' => $request->shipping_address['building'] ?? null,
                'phone' => $request->shipping_address['phone'] ?? null,
                'email' => $request->shipping_address['email'] ?? null,
            ]);

            $user->billing_address()->update([
                'full_name' => $request->billing_address['full_name'] ?? null,
                'postal_code' => $request->billing_address['postal_code'] ?? null,
                'city' => $request->billing_address['city'] ?? null,
                'prefecture' => $request->billing_address['prefecture'] ?? null,
                'street_address' => $request->billing_address['street_address'] ?? null,
                'building' => $request->billing_address['building'] ?? null,
                'phone' => $request->billing_address['phone'] ?? null,
                'email' => $request->billing_address['email'] ?? null,
            ]);

            if($role == UserRole::ROLE_FULL_SUPPORT_PLAN || $role == UserRole::ROLE_LIGHT_PLAN) {
                if($user->vendor_profile) {
                    $user->vendor_profile()->delete();
                }
                $validator_profile = Validator::make($request->all(), [
                    'dob' => 'nullable|date|date_format:Y-m-d',
                    'gender' => 'nullable|boolean',
                    'payment' => 'nullable|boolean',
                    'insurance_status' => 'nullable|numeric',
                    'overseas_remittance_status' => 'nullable|boolean',
                    'start_date_education' => 'nullable|date|date_format:Y-m-d',
                    'end_date_education' => 'nullable|date|date_format:Y-m-d',
                    'wabisabi_my_page_registration' => 'nullable|boolean',

                ]);
                if ($validator_profile->fails()) {
                    DB::rollBack();
                    $errors = $validator_profile->errors();
                    return $this->errorResponse($errors, 422);
                }
                $dob = $request->dob ?? null;
                $gender = (boolean)$request->gender;
                $facebook = $request->facebook ?? null;
                $line = $request->line ?? null;
                $address = $request->address ?? null;
                $nationality = $request->nationality ?? null;
                $visa_type = $request->visa_type ?? null;
                $job_name = $request->job_name ?? null;
                $company_representative = $request->company_representative ?? null;
                $inflow_source = $request->inflow_source ?? null;
                $payment = (int)$request->payment ?? null;
                $insurance_status = $request->insurance_status ?? null;
                $insurance_support = $request->insurance_support ?? null;
                $insurance_start_date = $request->insurance_start_date ?? null;
                $overseas_remittance_status = (int)$request->insurance_start_date ?? null;
                $orientation = $request->orientation ?? null;
                $start_date_education = $request->start_date_education ?? null;
                $end_date_education = $request->end_date_education ?? null;
                $education_status = (int)$request->education_status ?? null;
                $wabisabi_my_page_registration = (int)$request->wabisabi_my_page_registration ?? null;
                $user->profile()->update([
                    'dob' => $dob,
                    'gender' => $gender,
                    'facebook' => $facebook,
                    'line' => $line,
                    'address' => $address,
                    'nationality' => $nationality,
                    'visa_type' => $visa_type,
                    'job_name' => $job_name,
                    'company_representative' => $company_representative,
                    'inflow_source' => $inflow_source,
                    'payment' => $payment,
                    'insurance_status' => $insurance_status,
                    'insurance_support' => $insurance_support,
                    'insurance_start_date' => $insurance_start_date,
                    'overseas_remittance_status' => $overseas_remittance_status,
                    'orientation' => $orientation,
                    'start_date_education' => $start_date_education,
                    'end_date_education' => $end_date_education,
                    'education_status' => $education_status,
                    'wabisabi_my_page_registration' => $wabisabi_my_page_registration,
                ]);
            }elseif ($role == UserRole::ROLE_VENDOR) {
                $validator_vendor = Validator::make($request->all(), [
                    'images_outside' => 'nullable|array',
                    'images_outside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                    'images_inside' => 'nullable|array',
                    'images_inside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
                ]);
                if ($validator_vendor->fails()) {
                    DB::rollBack();
                    $errors = $validator_vendor->errors();
                    return $this->errorResponse($errors, 422);
                }
                $images_outside = $request->images_outside ?? null;
                $images_inside = $request->images_inside ?? null;

                $data_vendor = [
                    'en' => [
                        'name' => $request->en['name'] ?? null,
                        'permit_classification' => $request->en['permit_classification'] ?? null,
                        'founder' => $request->en['founder'] ?? null,
                        'items_stated_permit' => $request->en['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->en['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->en['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->en['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->en['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->en['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->en['business_hours'] ?? null,
                        'consultation_hours' => $request->en['consultation_hours'] ?? null,
                        'contact_information' => $request->en['contact_information'] ?? null,
                        'currently_working' => $request->en['currently_working'] ?? null,
                        'open_sale_time' => $request->en['open_sale_time'] ?? null,
                        'time_order_outside' => $request->en['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->en['expiration_date_of_drugs'] ?? null,
                    ],
                    'ja' => [
                        'name' => $request->ja['name'] ?? null,
                        'permit_classification' => $request->ja['permit_classification'] ?? null,
                        'founder' => $request->ja['founder'] ?? null,
                        'items_stated_permit' => $request->ja['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->ja['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->ja['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->ja['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->ja['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->ja['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->ja['business_hours'] ?? null,
                        'consultation_hours' => $request->ja['consultation_hours'] ?? null,
                        'contact_information' => $request->ja['contact_information'] ?? null,
                        'currently_working' => $request->ja['currently_working'] ?? null,
                        'open_sale_time' => $request->ja['open_sale_time'] ?? null,
                        'time_order_outside' => $request->ja['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->ja['expiration_date_of_drugs'] ?? null,
                    ],
                    'vi' => [
                        'name' => $request->vi['name'] ?? null,
                        'permit_classification' => $request->vi['permit_classification'] ?? null,
                        'founder' => $request->vi['founder'] ?? null,
                        'items_stated_permit' => $request->vi['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->vi['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->vi['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->vi['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->vi['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->vi['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->vi['business_hours'] ?? null,
                        'consultation_hours' => $request->vi['consultation_hours'] ?? null,
                        'contact_information' => $request->vi['contact_information'] ?? null,
                        'currently_working' => $request->vi['currently_working'] ?? null,
                        'open_sale_time' => $request->vi['open_sale_time'] ?? null,
                        'time_order_outside' => $request->vi['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->vi['expiration_date_of_drugs'] ?? null,
                    ],
                    'tl' => [
                        'name' => $request->tl['name'] ?? null,
                        'permit_classification' => $request->tl['permit_classification'] ?? null,
                        'founder' => $request->tl['founder'] ?? null,
                        'items_stated_permit' => $request->tl['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->tl['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->tl['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->tl['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->tl['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->tl['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->tl['business_hours'] ?? null,
                        'consultation_hours' => $request->tl['consultation_hours'] ?? null,
                        'contact_information' => $request->tl['contact_information'] ?? null,
                        'currently_working' => $request->tl['currently_working'] ?? null,
                        'open_sale_time' => $request->tl['open_sale_time'] ?? null,
                        'time_order_outside' => $request->tl['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->tl['expiration_date_of_drugs'] ?? null,
                    ],
                    'zh' => [
                        'name' => $request->zh['name'] ?? null,
                        'permit_classification' => $request->zh['permit_classification'] ?? null,
                        'founder' => $request->zh['founder'] ?? null,
                        'items_stated_permit' => $request->zh['items_stated_permit'] ?? null,
                        'management_pharmacist' => $request->zh['management_pharmacist'] ?? null,
                        'pharmacist_working' => $request->zh['pharmacist_working'] ?? null,
                        'registered_seller_working' => $request->zh['registered_seller_working'] ?? null,
                        'drugs_handled' => $request->zh['drugs_handled'] ?? null,
                        'distinguishing_by_name' => $request->zh['distinguishing_by_name'] ?? null,
                        'business_hours' => $request->zh['business_hours'] ?? null,
                        'consultation_hours' => $request->zh['consultation_hours'] ?? null,
                        'contact_information' => $request->zh['contact_information'] ?? null,
                        'currently_working' => $request->zh['currently_working'] ?? null,
                        'open_sale_time' => $request->zh['open_sale_time'] ?? null,
                        'time_order_outside' => $request->zh['time_order_outside'] ?? null,
                        'expiration_date_of_drugs' => $request->zh['expiration_date_of_drugs'] ?? null,
                    ],
                ];
                if($user->vendor_profile) {
                    $user->vendor_profile->update($data_vendor);
                    $vendor = $user->vendor_profile;
                    if($images_outside) {
                        $vendor->clearMediaCollection('images_outside');
                        $vendor->addMultipleMediaFromRequest(['images_outside'])->each(function ($fileAdder) {
                            $fileAdder->toMediaCollection('images_outside');
                        });
                    }
                    if($images_inside) {
                        $vendor->clearMediaCollection('images_inside');
                        $vendor->addMultipleMediaFromRequest(['images_inside'])->each(function ($fileAdder) {
                            $fileAdder->toMediaCollection('images_inside');
                        });
                    }
                }else{
                    $vendor = $user->vendor_profile()->create($data_vendor);
                    if($images_outside) {
                        $vendor->addMultipleMediaFromRequest(['images_outside'])->each(function ($fileAdder) {
                            $fileAdder->toMediaCollection('images_outside');
                        });
                    }
                    if($images_inside) {
                        $vendor->addMultipleMediaFromRequest(['images_inside'])->each(function ($fileAdder) {
                            $fileAdder->toMediaCollection('images_inside');
                        });
                    }
                }
            }
            DB::commit();
            return $this->successWithData(__('message.user.updated'), $user);
        }catch (\Exception $error){
            DB::rollBack();
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);
            $user->delete();
            return $this->success(__('message.user.deleted'));
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }

    public function profile(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $id = $request->user()->id;
            $user = User::with(['roles', 'profile', 'address', 'billing_address', 'shipping_address'])->find($id);
            return $this->responseData($user);
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }
}
