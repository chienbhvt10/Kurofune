<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\WithoutSpaces;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class ChangePasswordController extends Controller
{
    use RespondsStatusTrait;
    public function changePassword(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'current_password' => 'required|current_password',
                'password' => [
                    'required',
                    'string',
                    'different:current_password',
                    new WithoutSpaces,
                    Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
                    'confirmed'
                ],
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }
            User::find(auth()->user()->id)->update(['password'=> Hash::make($request->password)]);
            return $this->response_message_success(__('message.password.updated'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }
}
