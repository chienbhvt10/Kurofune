<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Address;
use Illuminate\Support\Facades\Validator;
use App\Traits\RespondsStatusTrait;
use App\Models\User;

class UserAddressController extends Controller
{
    use RespondsStatusTrait;

    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $data = Address::where('user_id', $user_id);
            $dataUser = User::where('id', $user_id);

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'postal_code' => 'required|string|max:50',
                'city' => 'required|string|max:255',
                'prefecture' => 'required|string|max:150',
                'street_address' => 'required|string|max:255',
                'building' => 'string|max:255',
                'phone' => 'numeric',
                'email' => 'email|required',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors, 442);
            }

            $check_postcode = checkPostalCode($request->postal_code);

            if ($check_postcode == false) {
                return $this->errorResponse(__( 'message.postal_code.valid'), 422);
            }

            $dataUpdate = [
                'postal_code' => $request->postal_code,
                'city' => $request->city,
                'prefecture' => $request->prefecture,
                'street_address' => $request->street_address,
                'building' => $request->building,
            ];

            $dataUserUpdate = [
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
            ];

            if (empty($data->first())) {
                $data = Address::create(['user_id' => $user_id]);
                $dataUser->update($dataUserUpdate);
                $data->update($dataUpdate);
            } else {
                $dataUser->update($dataUserUpdate);
                $data->update($dataUpdate);
            }

            return $this->successWithData(__('message.address.updated'), $data->get(), 200);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
