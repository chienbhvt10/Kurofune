<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\MatchOldPassword;
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
                'new_password' => [
                    'required',
                    'string',
                    'different:current_password',
                    new WithoutSpaces,
                    Password::min(8)
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                ],
                'new_confirm_password' => 'required|same:new_password'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
            User::find(auth()->user()->id)->update(['password'=> Hash::make($request->new_password)]);
            return $this->success(__('message.password.updated'));
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }
}
