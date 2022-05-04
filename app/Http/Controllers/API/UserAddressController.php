<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Address;
use Illuminate\Support\Facades\Validator;

class UserAddressController extends Controller
{
    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $data = Address::where('user_id', $user_id);

            $validator = Validator::make($request->all(), [
                'postal_code' => 'required|string|max:50',
                'city' => 'required|string|max:255',
                'prefecture' => 'required|string|max:150',
                'street_address' => 'required|string|max:255',
                'building' => 'string|max:255',
                'phone' => 'required|numeric',
            ], [

            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }

            $check_postcode = checkPostalCode($request->postal_code);

            if ($check_postcode == false) {
                return response()->json([
                    'status_code' => 422,
                    'message' => __( 'message.postal_code.valid')
                ], 422);
            }

            $dataUpdate = [
                'postal_code' => $request->postal_code,
                'city' => $request->city,
                'prefecture' => $request->prefecture,
                'street_address' => $request->street_address,
                'building' => $request->building,
                'phone' => $request->phone,
            ];

            $data->update($dataUpdate);

            return response()->json([
                'status_code' => 200,
                'message' => __('message.address.updated'),
                'data' => $data->get()
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
