<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\RespondsStatusTrait;
use App\Rules\PostalCode;
use Illuminate\Http\Response;

class BillingAddressController extends Controller
{
    use RespondsStatusTrait;

    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $data = $user->billing_address->first();

            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:100',
                'postal_code' => ['required','string' ,'max:50' , new PostalCode],
                'city' => 'required|string|max:255',
                'prefecture' => 'required|string|max:150',
                'street_address' => 'required|string|max:255',
                'building' => 'nullable|string|max:255',
                'phone' => 'required|numeric',
                'email' => 'required|email|max:100',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors, Response::HTTP_UNPROCESSABLE_ENTITY);
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

            $user->billing_address->update($dataUpdate);

            return $this->successWithData(__('message.billing.updated'), $data);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
