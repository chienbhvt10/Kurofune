<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VendorProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
                $users = User::with(['roles','vendor', 'profile', 'address', 'billing_address', 'shipping_address'])->get();
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
            $roles = Role::all()->pluck('name')->toArray();
            $validator = Validator::make($request->all(), [
                'username' => 'required|alpha_dash|unique:users',
                'name' => 'required',
                'email' => 'email|required',
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
                'phone' => 'numeric',
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
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }
            $username = $request->username;
            $name = $request->name;
            $email = $request->email;
            $password = $request->password;
            $active = (boolean)$request->password;
            $role = $request->role;
            $full_name = $request->full_name ?? null;
            $postal_code = $request->postal_code ?? null;
            $city = $request->city ?? null;
            $prefecture = $request->prefecture ?? null;
            $building = $request->building ?? null;
            $phone = $request->phone ?? null;
            $shipping_full_name = $request->full_name ?? null;
            $shipping_postal_code = $request->postal_code ?? null;
            $shipping_city = $request->city ?? null;
            $shipping_prefecture = $request->prefecture ?? null;
            $shipping_building = $request->building ?? null;
            $shipping_phone = $request->phone ?? null;
            $billing_full_name = $request->full_name ?? null;
            $billing_postal_code = $request->postal_code ?? null;
            $billing_city = $request->city ?? null;
            $billing_prefecture = $request->prefecture ?? null;
            $billing_building = $request->building ?? null;
            $billing_phone = $request->phone ?? null;
            $data = [
                'username' => $username,
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password),
                'active' => $active,
            ];
            $get_role = Role::findByName($role, 'api');
            $user = User::create($data);
            $user->assignRole($get_role);
            return response()->json($user);

            if(UserRole::ROLE_FULL_SUPPORT_PLAN || UserRole::ROLE_LIGHT_PLAN) {
                $validator_profile = Validator::make($request->all(), [
                    'dob' => 'date',
                    'gender' => 'boolean',
                    'phone' => 'numeric',
                    'payment' => 'boolean',
                    'overseas_remittance_status' => 'boolean',
                    'start_date_education' => 'date',
                    'end_date_education' => 'date',
                    'wabisabi_my_page_registration' => 'boolean',

                ]);
                if ($validator_profile->fails()) {
                    $errors = $validator_profile->errors();
                    return response()->json([
                        'status_code' => 422,
                        'message' => $errors
                    ], 422);
                }
            }

            $role = $request->role;
//            if($role ==)
        }catch (\Exception $error){
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
            $role = $user->roles;
            $profile = $user->profile;
            $address = $user->address;
            $billing_address = $user->billing_address;
            $shipping_address = $user->shipping_address;
            $vendor_profile_data = null;
            $vendor_profile = $user->vendor_profile;
            if($vendor_profile){
                $get_vendor_profile = $user->vendor_profile->first();

                $vendor_images1 = getMediaImages($get_vendor_profile, 'vendor_images1');
                $vendor_images2 = getMediaImages($get_vendor_profile, 'vendor_images2');

                $vendor_profile_data = [
                    'id' => $get_vendor_profile->id,
                    'vendor_translations' => $get_vendor_profile->translations,
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
