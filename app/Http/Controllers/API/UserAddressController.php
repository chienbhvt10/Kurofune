<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Address;
use Illuminate\Support\Facades\Validator;
use App\Traits\RespondsStatusTrait;
use App\Models\User;
use App\Rules\PostalCode;

class UserAddressController extends Controller
{
    use RespondsStatusTrait;

    public function update(Request $request)
    {
        try {
            $user = auth()->user();
            $user_id = $user->id;
            $data = Address::where('user_id', $user_id);
            $dataUser = User::find($user_id);

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'postal_code' => ['required', 'string', 'max:50', new PostalCode],
                'city' => 'required|string|max:255',
                'prefecture' => 'required|string|max:150',
                'street_address' => 'required|string|max:255',
                'building' => 'nullable|string|max:255',
                'phone' => 'required|numeric',
                'email' => 'required|email|unique:users,email,' . $user_id . ',id',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
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

            $dataUser->update($dataUserUpdate);
            $dataUser->address()->update($dataUpdate);
            $response = [
                'id' => $data->first()->id,
                'email' => $dataUser->email,
                'user_id' => $data->first()->user_id,
                'postal_code' => $data->first()->postal_code,
                'city' => $data->first()->city,
                'prefecture' => $data->first()->prefecture,
                'street_address' => $data->first()->street_address,
                'building' => $data->first()->building,
                'deleted_at' => $data->first()->deleted_at,
                'created_at' => $data->first()->created_at,
                'updated_at' => $data->first()->updated_at
            ];

            return $this->response_message_data_success(__('message.address.updated'), $response);
        } catch (\Exception $error) {
            return $error->getMessage();
            return $this->response_exception();
        }
    }
}
