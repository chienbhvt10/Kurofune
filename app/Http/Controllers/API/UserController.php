<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VendorProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $role = $request->role ?? null;
            if($role) {
                $users = User::whereHas('roles', function ($query) use($role) {
                    return $query->where('name', '=', $role);
                })->with(['roles', 'vendor_profile', 'profile', 'shipping_address', 'billing_address'])->get();
            }else {
                $users = User::with(['roles','vendor_profile', 'profile', 'address', 'billing_address', 'shipping_address'])->get();
            }
            return response()->json([
                'status_code' => Response::HTTP_OK,
                'data' => $users
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                'email' => 'email|required',
                'phone' => 'numeric',
                'password' => 'required|min:6',
                'active' => 'required|boolean',
                'avatar' => 'mimes:jpg,bmp,png',
                'role' => ['required', 'string', Rule::in($roles)],
                'full_name' => 'string|max:100',
                'postal_code' => 'string|max:50',
                'city' => 'string|max:255',
                'prefecture' => 'string|max:150',
                'street_address' => 'string|max:255',
                'building' => 'string|max:255',
                'shipping_full_name' => 'string|max:100',
                'shipping_postal_code' => 'string|max:50',
                'shipping_city' => 'string|max:255',
                'shipping_prefecture' => 'string|max:150',
                'shipping_street_address' => 'string|max:255',
                'shipping_building' => 'string|max:255',
                'shipping_phone' => 'numeric',
                'billing_full_name' => 'string|max:100',
                'billing_postal_code' => 'string|max:50',
                'billing_city' => 'string|max:255',
                'billing_prefecture' => 'string|max:150',
                'billing_street_address' => 'string|max:255',
                'billing_building' => 'string|max:255',
                'billing_phone' => 'numeric',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }
            $username = $request->username;
            $name = $request->name;
            $email = $request->email;
            $phone = $request->phone;
            $password = $request->password;
            $active = (boolean)$request->password;
            $role = $request->role;

            $data = [
                'username' => $username,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'password' => Hash::make($password),
                'active' => $active,
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
                'full_name' => $request->shipping_fullname ?? null,
                'postal_code' => $request->shipping_postal_code ?? null,
                'city' => $request->shipping_city ?? null,
                'prefecture' => $request->shipping_prefecture ?? null,
                'street_address' => $request->shipping_street_address ?? null,
                'building' => $request->shipping_building ?? null,
                'phone' => $request->shipping_phone ?? null,
                'email' => $request->shipping_email ?? null,
            ]);

            $user->billing_address()->create([
                'full_name' => $request->billing_fullname ?? null,
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
                    'dob' => 'date|date_format:Y-m-d',
                    'gender' => 'boolean',
                    'payment' => 'boolean',
                    'overseas_remittance_status' => 'boolean',
                    'start_date_education' => 'date|date_format:Y-m-d',
                    'end_date_education' => 'date|date_format:Y-m-d',
                    'wabisabi_my_page_registration' => 'boolean',

                ]);
                if ($validator_profile->fails()) {
                    DB::rollBack();
                    $errors = $validator_profile->errors();
                    return response()->json([
                        'status_code' => 422,
                        'message' => $errors
                    ], 422);
                }
                $dob = $request->dob ?? null;
                $gender = (boolean)$request->gender;
                $phone = $request->phone ?? null;
                $facebook = $request->facebook ?? null;
                $line = $request->line ?? null;
                $address = $request->address ?? null;
                $nationality = $request->nationality ?? null;
                $visa_type = $request->visa_type ?? null;
                $job_name = $request->job_name ?? null;
                $company_representative = $request->company_representative ?? null;
                $inflow_source = $request->inflow_source ?? null;
                $payment = (int)$request->payment ?? null;
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
                    'phone' => $phone,
                    'facebook' => $facebook,
                    'line' => $line,
                    'address' => $address,
                    'nationality' => $nationality,
                    'visa_type' => $visa_type,
                    'job_name' => $job_name,
                    'company_representative' => $company_representative,
                    'inflow_source' => $inflow_source,
                    'payment' => $payment,
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
                    'vendor_images1' => 'mimes:jpg,bmp,png',
                    'vendor_images2' => 'mimes:jpg,bmp,png',
                    'en' => 'required',
                    'ja' => 'required',
                    'vi' => 'required',
                    'tl' => 'required',
                    'zh' => 'required',

                ]);
                if ($validator_vendor->fails()) {
                    DB::rollBack();
                    $errors = $validator_vendor->errors();
                    return response()->json([
                        'status_code' => 422,
                        'message' => $errors
                    ], 422);
                }
                $vendor_images1 = $request->vendor_images1 ?? null;
                $vendor_images2 = $request->vendor_images2 ?? null;

                $data_vendor = [
                  'en' => $request->en ?? null,
                  'ja' => $request->ja ?? null,
                  'vi' => $request->vi ?? null,
                  'tl' => $request->tl ?? null,
                  'zh' => $request->zh ?? null,
                ];

                $vendor = $user->vendor_profile()->create($data_vendor);
                if($vendor_images1) {
                    $vendor->addMediaFromRequest($vendor_images1)->toMediaCollection('vendor_images1');
                }
                if($vendor_images2) {
                    $vendor->addMediaFromRequest($vendor_images2)->toMediaCollection('vendor_images2');
                }
            }

            DB::commit();
            return response()->json([
                'status_code' => 200,
                'message' => __('create user successfully'),
                'data' => $user
            ]);
        }catch (\Exception $error){
            DB::rollBack();
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                return response()->json([
                    'status_code' => Response::HTTP_NOT_FOUND,
                    'message' => __('User not exist')
                ]);
            }
            $role = $user->roles;
            $profile = $user->profile;
            $address = $user->address;
            $billing_address = $user->billing_address;
            $shipping_address = $user->shipping_address;
            $vendor_profile_data = null;
            $vendor_profile = $user->vendor_profile;
            if($vendor_profile){
                $vendor_images1 = getMediaImages($vendor_profile, 'vendor_images1');
                $vendor_images2 = getMediaImages($vendor_profile, 'vendor_images2');

                $vendor_profile_data = [
                    'id' => $vendor_profile->id,
                    'vendor_translations' => $vendor_profile->translations,
                    'vendor_images1' => $vendor_images1,
                    'vendor_images2' => $vendor_images2,
                ];
            }
            $response = [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'active' => $user->active,
                'avatar' => $user->avatar,
                'role' => $role,
                'profile' => $profile,
                'vendor_profile' => $vendor_profile_data,
                'address' => $address,
                'billing_address' => $billing_address,
                'shipping_address' => $shipping_address,
            ];
            return response()->json([
                'status_code' => Response::HTTP_OK,
                'data' => $response
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
            return response()->json([
                'status_code' => Response::HTTP_OK,
                'message' => 'Delete user successfully'
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function profile(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $id = $request->user()->id;
            $user = User::with(['roles', 'profile', 'address', 'billing_address', 'shipping_address'])->find($id);
            return response()->json([
                'status_code' => Response::HTTP_OK,
                'data' => $user
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
