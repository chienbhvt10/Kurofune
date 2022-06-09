<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\ShippingAddress;
use App\Traits\RespondsStatusTrait;
use Illuminate\Support\Facades\Validator;
use App\Rules\PostalCode;

class ShippingAddressController extends Controller
{
    use RespondsStatusTrait;

    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $data = $user->shipping_address->first();

            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:100',
                'postal_code' => ['required', 'string', 'max:50', new PostalCode],
                'city' => 'required|string|max:255',
                'prefecture' => 'required|string|max:150',
                'street_address' => 'required|string|max:255',
                'building' => 'nullable|string|max:255',
                'phone' => 'required|numeric',
                'email' => 'required|email|max:100',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
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

            $user->shipping_address->update($dataUpdate);

            return $this->response_message_data_success(__('message.shipping.updated'), $data);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }
}
