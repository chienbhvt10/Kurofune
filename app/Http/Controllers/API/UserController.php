<?php

namespace App\Http\Controllers\API;

use App\Enums\Base;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VendorProfile;
use App\Notifications\ChangePasswordNotification;
use App\Notifications\RegisterUserNotification;
use App\Rules\WithoutSpaces;
use App\Traits\CustomFilterTrait;
use App\Traits\RespondsStatusTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;
use App\Rules\PostalCode;

class UserController extends Controller
{
    use RespondsStatusTrait, CustomFilterTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $role = $request->role ?? null;
            $posts_per_page = get_per_page($request->per_page);
            if($role) {
                $users = User::whereHas('roles', function ($query) use($role) {
                    return $query->where('name', '=', $role);
                })->where('name', 'LIKE', '%' . $request->name . '%')
                ->with(['roles', 'vendor_profile', 'profile', 'shipping_address', 'billing_address'])->paginate($posts_per_page);
            } else {
                if ($request->name) {
                    $users = $this->filterScopeName(new User, $request->name)->with(['roles','vendor_profile', 'profile', 'address', 'billing_address', 'shipping_address'])->paginate($posts_per_page);
                } else {
                    $users = User::with(['roles','vendor_profile', 'profile', 'address', 'billing_address', 'shipping_address'])->paginate($posts_per_page);
                }
            }
            return $this->response_data_success($users);
        }catch (\Exception $error){
            return $this->response_exception();
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
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'role' => ['required', 'string', Rule::in($roles)],
                'full_name' => 'string|max:100',
                'postal_code' => ['required', 'string', 'max:50', new PostalCode],
                'city' => 'nullable|string|max:255',
                'prefecture' => 'nullable|string|max:150',
                'street_address' => 'nullable|string|max:255',
                'building' => 'nullable|string|max:255',
                'shipping_full_name' => 'nullable|string|max:100',
                'shipping_postal_code' => ['nullable', 'string', 'max:50', new PostalCode],
                'shipping_city' => 'nullable|string|max:255',
                'shipping_prefecture' => 'nullable|string|max:150',
                'shipping_street_address' => 'nullable|string|max:255',
                'shipping_building' => 'nullable|string|max:255',
                'shipping_phone' => 'nullable|numeric',
                'shipping_email' => 'nullable|email',
                'billing_full_name' => 'nullable|string|max:100',
                'billing_postal_code' => ['nullable', 'string', 'max:50', new PostalCode],
                'billing_city' => 'nullable|string|max:255',
                'billing_prefecture' => 'nullable|string|max:150',
                'billing_street_address' => 'nullable|string|max:255',
                'billing_building' => 'nullable|string|max:255',
                'billing_phone' => 'nullable|numeric',
                'billing_email' => 'nullable|email',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }
            $username = $request->username;
            $name = $request->name;
            $email = $request->email;
            $phone = $request->phone;
            $password = trim($request->password);
            $active = (boolean)$request->active;
            $role = $request->role;
            $file_avatar = $request->file('avatar');
            $filename = $file_avatar ? upload_single_image($file_avatar, 'avatar') : null;

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
                'full_name' => $request->shipping_full_name ?? null,
                'postal_code' => $request->shipping_postal_code ?? null,
                'city' => $request->shipping_city ?? null,
                'prefecture' => $request->shipping_prefecture ?? null,
                'street_address' => $request->shipping_street_address ?? null,
                'building' => $request->shipping_building ?? null,
                'phone' => $request->shipping_phone ?? null,
                'email' => $request->shipping_email ?? null,
            ]);

            $user->billing_address()->create([
                'full_name' => $request->billing_full_name ?? null,
                'postal_code' => $request->billing_postal_code ?? null,
                'city' => $request->billing_city ?? null,
                'prefecture' => $request->billing_prefecture ?? null,
                'street_address' => $request->billing_street_address ?? null,
                'building' => $request->billing_building ?? null,
                'phone' => $request->billing_phone ?? null,
                'email' => $request->billing_email ?? null,
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
                    return $this->response_validate($errors);
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
                    'images_outside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                    'images_inside' => 'nullable|array',
                    'images_inside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                ]);
                if ($validator_vendor->fails()) {
                    DB::rollBack();
                    $errors = $validator_vendor->errors();
                    return $this->response_validate($errors);
                }
                $images_outside = $request->images_outside ?? null;
                $images_inside = $request->images_inside ?? null;

                $data_vendor = [
                    'images_outside' => $vendor_images_outside ?? null,
                    'images_inside' => $vendor_images_inside ?? null,
                    'en' => [
                        'name' => $request->en_name ?? null,
                        'permit_classification' => $request->en_permit_classification ?? null,
                        'founder' => $request->en_founder ?? null,
                        'items_stated_permit' => $request->en_items_stated_permit ?? null,
                        'management_pharmacist' => $request->en_management_pharmacist ?? null,
                        'pharmacist_working' => $request->en_pharmacist_working ?? null,
                        'registered_seller_working' => $request->en_registered_seller_working ?? null,
                        'drugs_handled' => $request->en_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->en_distinguishing_by_name ?? null,
                        'business_hours' => $request->en_business_hours ?? null,
                        'consultation_hours' => $request->en_consultation_hours ?? null,
                        'contact_information' => $request->en_contact_information ?? null,
                        'currently_working' => $request->en_currently_working ?? null,
                        'open_sale_time' => $request->en_open_sale_time ?? null,
                        'time_order_outside' => $request->en_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->en_expiration_date_of_drugs ?? null,
                    ],
                    'ja' => [
                        'name' => $request->ja_name ?? null,
                        'permit_classification' => $request->ja_permit_classification ?? null,
                        'founder' => $request->ja_founder ?? null,
                        'items_stated_permit' => $request->ja_items_stated_permit ?? null,
                        'management_pharmacist' => $request->ja_management_pharmacist ?? null,
                        'pharmacist_working' => $request->ja_pharmacist_working ?? null,
                        'registered_seller_working' => $request->ja_registered_seller_working ?? null,
                        'drugs_handled' => $request->ja_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->ja_distinguishing_by_name ?? null,
                        'business_hours' => $request->ja_business_hours ?? null,
                        'consultation_hours' => $request->ja_consultation_hours ?? null,
                        'contact_information' => $request->ja_contact_information ?? null,
                        'currently_working' => $request->ja_currently_working ?? null,
                        'open_sale_time' => $request->ja_open_sale_time ?? null,
                        'time_order_outside' => $request->ja_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->ja_expiration_date_of_drugs ?? null,
                    ],
                    'vi' => [
                        'name' => $request->vi_name ?? null,
                        'permit_classification' => $request->vi_permit_classification ?? null,
                        'founder' => $request->vi_founder ?? null,
                        'items_stated_permit' => $request->vi_items_stated_permit ?? null,
                        'management_pharmacist' => $request->vi_management_pharmacist ?? null,
                        'pharmacist_working' => $request->vi_pharmacist_working ?? null,
                        'registered_seller_working' => $request->vi_registered_seller_working ?? null,
                        'drugs_handled' => $request->vi_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->vi_distinguishing_by_name ?? null,
                        'business_hours' => $request->vi_business_hours ?? null,
                        'consultation_hours' => $request->vi_consultation_hours ?? null,
                        'contact_information' => $request->vi_contact_information ?? null,
                        'currently_working' => $request->vi_currently_working ?? null,
                        'open_sale_time' => $request->vi_open_sale_time ?? null,
                        'time_order_outside' => $request->vi_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->vi_expiration_date_of_drugs ?? null,
                    ],
                    'tl' => [
                        'name' => $request->tl_name ?? null,
                        'permit_classification' => $request->tl_permit_classification ?? null,
                        'founder' => $request->tl_founder ?? null,
                        'items_stated_permit' => $request->tl_items_stated_permit ?? null,
                        'management_pharmacist' => $request->tl_management_pharmacist ?? null,
                        'pharmacist_working' => $request->tl_pharmacist_working ?? null,
                        'registered_seller_working' => $request->tl_registered_seller_working ?? null,
                        'drugs_handled' => $request->tl_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->tl_distinguishing_by_name ?? null,
                        'business_hours' => $request->tl_business_hours ?? null,
                        'consultation_hours' => $request->tl_consultation_hours ?? null,
                        'contact_information' => $request->tl_contact_information ?? null,
                        'currently_working' => $request->tl_currently_working ?? null,
                        'open_sale_time' => $request->tl_open_sale_time ?? null,
                        'time_order_outside' => $request->tl_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->tl_expiration_date_of_drugs ?? null,
                    ],
                    'zh' => [
                        'name' => $request->zh_name ?? null,
                        'permit_classification' => $request->zh_permit_classification ?? null,
                        'founder' => $request->zh_founder ?? null,
                        'items_stated_permit' => $request->zh_items_stated_permit ?? null,
                        'management_pharmacist' => $request->zh_management_pharmacist ?? null,
                        'pharmacist_working' => $request->zh_pharmacist_working ?? null,
                        'registered_seller_working' => $request->zh_registered_seller_working ?? null,
                        'drugs_handled' => $request->zh_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->zh_distinguishing_by_name ?? null,
                        'business_hours' => $request->zh_business_hours ?? null,
                        'consultation_hours' => $request->zh_consultation_hours ?? null,
                        'contact_information' => $request->zh_contact_information ?? null,
                        'currently_working' => $request->zh_currently_working ?? null,
                        'open_sale_time' => $request->zh_open_sale_time ?? null,
                        'time_order_outside' => $request->zh_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->zh_expiration_date_of_drugs ?? null,
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
            $data = [
                'email' => $email,
                'username' => $username,
                'password' => $password
            ];
            Notification::sendNow($user, new RegisterUserNotification($data));
            return $this->response_message_data_success(__('message.user.created'), $user);
        }catch (\Exception $error){
            DB::rollBack();
            return $this->response_exception();
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
                return $this->response_error(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
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
            return $this->response_data_success($response);
        }catch (\Exception $error){
            return $this->response_exception();
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
                return $this->response_error(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $roles = Role::all()->pluck('name')->toArray();
            $validator = Validator::make($request->all(), [
                'name' => 'nullable',
                'email' => 'nullable|email',
                'phone' => 'nullable|numeric',
                'active' => 'nullable|boolean',
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                'role' => ['required', 'string', Rule::in($roles)],
                'full_name' => 'nullable|string|max:100',
                'postal_code' => ['nullable', 'string', 'max:50', new PostalCode],
                'city' => 'nullable|string|max:255',
                'prefecture' => 'nullable|string|max:150',
                'street_address' => 'nullable|string|max:255',
                'building' => 'nullable|string|max:255',
                'shipping_full_name' => 'nullable|string|max:100',
                'shipping_postal_code' => ['nullable', 'string', 'max:50', new PostalCode],
                'shipping_city' => 'nullable|string|max:255',
                'shipping_prefecture' => 'nullable|string|max:150',
                'shipping_street_address' => 'nullable|string|max:255',
                'shipping_building' => 'nullable|string|max:255',
                'shipping_phone' => 'nullable|numeric',
                'shipping_email' => 'nullable|email',
                'billing_full_name' => 'nullable|string|max:100',
                'billing_postal_code' => ['nullable', 'string', 'max:50', new PostalCode],
                'billing_city' => 'nullable|string|max:255',
                'billing_prefecture' => 'nullable|string|max:150',
                'billing_street_address' => 'nullable|string|max:255',
                'billing_building' => 'nullable|string|max:255',
                'billing_phone' => 'nullable|numeric',
                'billing_email' => 'nullable|email',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }
            $name = $request->name;
            $email = $request->email;
            $phone = $request->phone;
            $password = trim($request->password) ?? null;
            $active = (boolean)$request->active;
            $role = $request->role;
            $file_avatar = $request->file('avatar') ?? null;
            if($file_avatar) {
                $filename = upload_single_image($file_avatar);
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
                    return $this->response_validate($errors);
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
                'full_name' => $request->shipping_full_name ?? null,
                'postal_code' => $request->shipping_postal_code ?? null,
                'city' => $request->shipping_city ?? null,
                'prefecture' => $request->shipping_prefecture ?? null,
                'street_address' => $request->shipping_street_address ?? null,
                'building' => $request->shipping_building ?? null,
                'phone' => $request->shipping_phone ?? null,
                'email' => $request->shipping_email ?? null,
            ]);

            $user->billing_address()->update([
                'full_name' => $request->billing_full_name ?? null,
                'postal_code' => $request->billing_postal_code ?? null,
                'city' => $request->billing_city ?? null,
                'prefecture' => $request->billing_prefecture ?? null,
                'street_address' => $request->billing_street_address ?? null,
                'building' => $request->billing_building ?? null,
                'phone' => $request->billing_phone ?? null,
                'email' => $request->billing_email ?? null,
            ]);

            if($role == UserRole::ROLE_FULL_SUPPORT_PLAN || $role == UserRole::ROLE_LIGHT_PLAN) {
                if($user->vendor_profile) {
                    $user->vendor_profile()->delete();
                    if ($user->products) {
                        $user->products()->forceDelete();
                    }
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
                    return $this->response_validate($errors);
                }
                $data_profile = [
                    'dob' => $request->dob ?? null,
                    'gender' => (boolean)$request->gender,
                    'facebook' => $request->facebook ?? null,
                    'line' => $request->line ?? null,
                    'address' => $request->address ?? null,
                    'nationality' => $request->nationality ?? null,
                    'visa_type' => $request->visa_type ?? null,
                    'job_name' => $request->job_name ?? null,
                    'company_representative' => $request->company_representative ?? null,
                    'inflow_source' => $request->inflow_source ?? null,
                    'payment' => (int)$request->payment ?? null,
                    'insurance_status' => $request->insurance_status ?? null,
                    'insurance_support' => $request->insurance_support ?? null,
                    'insurance_start_date' => $request->insurance_start_date ?? null,
                    'overseas_remittance_status' => (int)$request->insurance_start_date ?? null,
                    'orientation' => $request->orientation ?? null,
                    'start_date_education' => $request->start_date_education ?? null,
                    'end_date_education' => $request->end_date_education ?? null,
                    'education_status' => (int)$request->education_status ?? null,
                    'wabisabi_my_page_registration' => (int)$request->wabisabi_my_page_registration ?? null,
                ];
                if ($user->profile) {
                    $user->profile()->update($data_profile);
                } else {
                    $user->profile()->create($data_profile);
                }
            }elseif ($role == UserRole::ROLE_VENDOR) {
                $validator_vendor = Validator::make($request->all(), [
                    'images_outside' => 'nullable|array',
                    'images_outside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                    'images_inside' => 'nullable|array',
                    'images_inside.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
                    'images_inside_delete' => 'nullable|array',
                    'images_inside_delete.*' => 'integer',
                    'images_outside_delete' => 'nullable|array',
                    'images_outside_delete.*' => 'integer'
                ]);
                if ($validator_vendor->fails()) {
                    DB::rollBack();
                    $errors = $validator_vendor->errors();
                    return $this->response_validate($errors);
                }
                $images_outside = $request->images_outside ?? null;
                $images_inside = $request->images_inside ?? null;
                $images_outside_delete = $request->images_outside_delete ?? null;
                $images_inside_delete = $request->images_inside_delete ?? null;

                $data_vendor = [
                    'en' => [
                        'name' => $request->en_name ?? null,
                        'permit_classification' => $request->en_permit_classification ?? null,
                        'founder' => $request->en_founder ?? null,
                        'items_stated_permit' => $request->en_items_stated_permit ?? null,
                        'management_pharmacist' => $request->en_management_pharmacist ?? null,
                        'pharmacist_working' => $request->en_pharmacist_working ?? null,
                        'registered_seller_working' => $request->en_registered_seller_working ?? null,
                        'drugs_handled' => $request->en_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->en_distinguishing_by_name ?? null,
                        'business_hours' => $request->en_business_hours ?? null,
                        'consultation_hours' => $request->en_consultation_hours ?? null,
                        'contact_information' => $request->en_contact_information ?? null,
                        'currently_working' => $request->en_currently_working ?? null,
                        'open_sale_time' => $request->en_open_sale_time ?? null,
                        'time_order_outside' => $request->en_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->en_expiration_date_of_drugs ?? null,
                    ],
                    'ja' => [
                        'name' => $request->ja_name ?? null,
                        'permit_classification' => $request->ja_permit_classification ?? null,
                        'founder' => $request->ja_founder ?? null,
                        'items_stated_permit' => $request->ja_items_stated_permit ?? null,
                        'management_pharmacist' => $request->ja_management_pharmacist ?? null,
                        'pharmacist_working' => $request->ja_pharmacist_working ?? null,
                        'registered_seller_working' => $request->ja_registered_seller_working ?? null,
                        'drugs_handled' => $request->ja_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->ja_distinguishing_by_name ?? null,
                        'business_hours' => $request->ja_business_hours ?? null,
                        'consultation_hours' => $request->ja_consultation_hours ?? null,
                        'contact_information' => $request->ja_contact_information ?? null,
                        'currently_working' => $request->ja_currently_working ?? null,
                        'open_sale_time' => $request->ja_open_sale_time ?? null,
                        'time_order_outside' => $request->ja_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->ja_expiration_date_of_drugs ?? null,
                    ],
                    'vi' => [
                        'name' => $request->vi_name ?? null,
                        'permit_classification' => $request->vi_permit_classification ?? null,
                        'founder' => $request->vi_founder ?? null,
                        'items_stated_permit' => $request->vi_items_stated_permit ?? null,
                        'management_pharmacist' => $request->vi_management_pharmacist ?? null,
                        'pharmacist_working' => $request->vi_pharmacist_working ?? null,
                        'registered_seller_working' => $request->vi_registered_seller_working ?? null,
                        'drugs_handled' => $request->vi_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->vi_distinguishing_by_name ?? null,
                        'business_hours' => $request->vi_business_hours ?? null,
                        'consultation_hours' => $request->vi_consultation_hours ?? null,
                        'contact_information' => $request->vi_contact_information ?? null,
                        'currently_working' => $request->vi_currently_working ?? null,
                        'open_sale_time' => $request->vi_open_sale_time ?? null,
                        'time_order_outside' => $request->vi_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->vi_expiration_date_of_drugs ?? null,
                    ],
                    'tl' => [
                        'name' => $request->tl_name ?? null,
                        'permit_classification' => $request->tl_permit_classification ?? null,
                        'founder' => $request->tl_founder ?? null,
                        'items_stated_permit' => $request->tl_items_stated_permit ?? null,
                        'management_pharmacist' => $request->tl_management_pharmacist ?? null,
                        'pharmacist_working' => $request->tl_pharmacist_working ?? null,
                        'registered_seller_working' => $request->tl_registered_seller_working ?? null,
                        'drugs_handled' => $request->tl_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->tl_distinguishing_by_name ?? null,
                        'business_hours' => $request->tl_business_hours ?? null,
                        'consultation_hours' => $request->tl_consultation_hours ?? null,
                        'contact_information' => $request->tl_contact_information ?? null,
                        'currently_working' => $request->tl_currently_working ?? null,
                        'open_sale_time' => $request->tl_open_sale_time ?? null,
                        'time_order_outside' => $request->tl_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->tl_expiration_date_of_drugs ?? null,
                    ],
                    'zh' => [
                        'name' => $request->zh_name ?? null,
                        'permit_classification' => $request->zh_permit_classification ?? null,
                        'founder' => $request->zh_founder ?? null,
                        'items_stated_permit' => $request->zh_items_stated_permit ?? null,
                        'management_pharmacist' => $request->zh_management_pharmacist ?? null,
                        'pharmacist_working' => $request->zh_pharmacist_working ?? null,
                        'registered_seller_working' => $request->zh_registered_seller_working ?? null,
                        'drugs_handled' => $request->zh_drugs_handled ?? null,
                        'distinguishing_by_name' => $request->zh_distinguishing_by_name ?? null,
                        'business_hours' => $request->zh_business_hours ?? null,
                        'consultation_hours' => $request->zh_consultation_hours ?? null,
                        'contact_information' => $request->zh_contact_information ?? null,
                        'currently_working' => $request->zh_currently_working ?? null,
                        'open_sale_time' => $request->zh_open_sale_time ?? null,
                        'time_order_outside' => $request->zh_time_order_outside ?? null,
                        'expiration_date_of_drugs' => $request->zh_expiration_date_of_drugs ?? null,
                    ],
                ];

                if($user->vendor_profile) {
                    $user->vendor_profile->update($data_vendor);
                    $vendor = $user->vendor_profile;
                    if ($images_outside_delete) {
                        $media_outside = $vendor->getMedia('images_outside');
                        foreach ($images_outside_delete as $img) {
                            $media_outside[$img]->delete();
                        }
                    }
                    if ($images_inside_delete) {
                        $media_inside = $vendor->getMedia('images_inside');
                        foreach ($images_inside_delete as $img) {
                            $media_inside[$img]->delete();
                        }
                    }
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
                }else{
                    $user->vendor_profile()->create($data_vendor);
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

                if ($user->profile) {
                    $user->profile()->forceDelete();
                }
            } elseif ($role == UserRole::ROLE_ADMIN) {
                if ($user->vendor_profile) {
                    $user->vendor_profile()->delete();
                    if ($user->products) {
                        $user->products()->forceDelete();
                    }
                }

                if ($user->profile) {
                    $user->profile()->forceDelete();
                }
            }
            DB::commit();
            if($password) {
                $data = [
                    'email' => $email,
                    'password' => $password,
                    'username' => $user->username
                ];
                Notification::sendNow($user, New ChangePasswordNotification($data));
            }
            return $this->response_message_data_success(__('message.user.updated'), $user);
        }catch (\Exception $error){
            DB::rollBack();
            return $this->response_exception();
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
            return $this->response_message_success(__('message.user.deleted'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    public function profile(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $id = $request->user()->id;
            $user = User::with(['roles', 'profile', 'address', 'billing_address', 'shipping_address'])->find($id);
            return $this->response_data_success($user);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }
}
