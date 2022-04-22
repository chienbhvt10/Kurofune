<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\ShippingAddress;
use Illuminate\Support\Facades\Validator;

class ShippingAddressController extends Controller
{
    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $data = ShippingAddress::where('user_id', $user_id);

            $check_postcode = checkPostalCode($request->postal_code);

            if ($check_postcode == false) {
                return response()->json([
                    'status_code' => 422,
                    'message' => __( 'message.valid_postal_code')
                ], 422);
            }
            
            $validator = Validator::make($request->all(), [
                'full_name' => 'string|required|max:100',
                'postal_code' => 'postal_code:JP|string|required|max:50',
                'city' => 'string|required|max:255',
                'prefecture' => 'string|required|max:150',
                'street_address' => 'string|required|max:255',
                'building' => 'string|max:255',
                'phone' => 'numeric|required',
                'email' => 'email|required|max:100',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }

            $dataUpdate = [
                'full_name' => $request->full_name,
                'postal_code' => $request->postal_code,
                'city' => $request->city,
                'prefecture' => $request->prefecture,
                'street_address' => $request->street_address,
                'building' => $request->building,
                'phone' => $request->phone,
                'email' => $request->email,
            ];

            $data->update($dataUpdate);

            return response()->json([
                'status_code' => 200,
                'message' => __('message.update_shipping_success'),
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
