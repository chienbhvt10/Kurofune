<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\BillingAddress;
use Illuminate\Support\Facades\Validator;
use App\Traits\RespondsStatusTrait;

class BillingAddressController extends Controller
{
    use RespondsStatusTrait;

    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $data = BillingAddress::where('user_id', $user_id);

            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:100',
                'postal_code' => 'required|string|max:50',
                'city' => 'required|string|max:255',
                'prefecture' => 'required|string|max:150',
                'street_address' => 'required|string|max:255',
                'building' => 'string|max:255',
                'phone' => 'required|numeric',
                'email' => 'required|email|max:100',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors);
            }

            $check_postcode = checkPostalCode($request->postal_code);

            if ($check_postcode == false) {
                return $this->errorResponse(__( 'message.postal_code.valid'));
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

            if (empty($data->first())) {
                $data = BillingAddress::create(['user_id' => $user_id]);
                $data->update($dataUpdate);
            } else {
                $data->update($dataUpdate);
            }

            return $this->successWithData(__('message.billing.updated'), $data->get());
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
