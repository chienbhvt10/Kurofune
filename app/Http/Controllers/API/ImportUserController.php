<?php

namespace App\Http\Controllers\API;

use App\Enums\Base;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Address;
use App\Models\Profile;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ImportUserController extends Controller
{
    public function importUser(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'file_upload' => 'required|mimes:csv,txt',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }
            DB::beginTransaction();

            $data = file($request->file('file_upload'));
            $path = resource_path('temp-csv');
            if (!is_dir($path)) {
                mkdir(resource_path() . '/temp-csv', 0755);
            }
            $chunks = array_chunk($data, 1000);
            foreach ($chunks as $key => $chunk) {
                $name = "/csv-{$key}.csv";
                file_put_contents($path . $name, $chunk);
            }
            $files = glob("$path/*.csv");
            foreach ($files as $key => $file) {
                $data = array_map('str_getcsv', file($file));
                if ($key == 0) {
                    unset($data[0]);
                }
                foreach ($data as $item) {
                    $user_current = User::where('email', $item[7])->with('profile')->with('address')->first();
                    $birthday = $item[2] . '-' . $item[3] . '-' . $item[4];
                    $gender = Base::MALE;
                    if ($item[5] == '男') {
                        $gender = Base::MALE;
                    } elseif ($item[5] == '女') {
                        $gender = Base::FEMALE;
                    }

                    if ($item[18] == 'N1') {
                        $education_status = Base::EDU_N1;
                    } elseif ($item[18] == 'N2') {
                        $education_status = Base::EDU_N2;
                    } elseif ($item[18] == 'N3') {
                        $education_status = Base::EDU_N3;
                    } elseif ($item[18] == 'N4') {
                        $education_status = Base::EDU_N4;
                    } elseif ($item[18] == 'N5') {
                        $education_status = Base::EDU_N5;
                    } else {
                        $education_status = Base::EDU_N0;
                    }

                    $data_user = [
                        'email' => $item[7],
                        'username' => $item[0],
                        'name' => $item[1],
                        'phone' => $item[23],
                        'password' => Hash::make($item[24]),
                        'email_verified_at' => Carbon::now(),
                        'active' => '1'
                    ];

                    $data_address = [
                        'postal_code' => $item[10],
                        'prefecture' => $item[11],
                        'city' => $item[12],
                        'street_address' => $item[13],
                        'building' => $item[14],
                    ];

                    $data_profile = [
                        'dob' => $birthday,
                        'gender' => $gender,
                        'facebook' => $item[8],
                        'line' => $item[9],
                        'address' => $item[11],
                        'nationality' => $item[16],
                        'visa_type' => $item[17],
                        'job_name' => $item[19],
                        'company_representative' => $item[20],
                        'education_status' => $education_status,
                    ];

                    if (empty($user_current)) {
                        $save_user = User::create($data_user);
                        if ($item[25] == 'フルサポートプラン') {
                            $user_role = UserRole::ROLE_FULL_SUPPORT_PLAN;
                            $save_user->assignRole($user_role);
                        } else {
                            $user_role = UserRole::ROLE_LIGHT_PLAN;
                            $save_user->assignRole($user_role);
                        }
                        $data_address = array_merge($data_address, ['user_id' => $save_user->id]);
                        $save_address = Address::create($data_address);
                        $data_profile = array_merge($data_profile, ['user_id' => $save_user->id]);
                        $save_profile = Profile::create($data_profile);
                    } else {
                        $update_user = User::where('id', $user_current->id)->first();
                        if (!empty($update_user)) {
                            $update_user->update($data_user);
                        }
                        $update_address = Address::where('user_id', $user_current->id)->first();
                        if (!empty($update_address)) {
                            $update_address->update($data_address);
                        }
                        $update_profile = Profile::where('user_id', $user_current->id)->first();
                        if (!empty($update_profile)) {
                            $update_profile->update($data_profile);
                        }
                    }
                }
                unlink($file);
            }
            DB::commit();
            return response()->json([
                'status_code' => 200,
                'message' => __('message.import_user.success'),
            ]);
        } catch (\Exception $error) {
            if (is_dir($path)) {
                rmdir($path);
            }
            DB::rollBack();
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
