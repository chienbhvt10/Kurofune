<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Rules\WithoutSpaces;
use App\Traits\RespondsStatusTrait;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    use RespondsStatusTrait;

    public function forgotPassword(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $status = Password::sendResetLink(
                $request->only('email')
            );

            if ($status == Password::RESET_LINK_SENT) {
                return $this->response_message_success(__('message.password.reset_link_sent'));
            }else{
                return $this->response_error(__($status),422);
            }
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    public function resetPassword(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'token' => 'required',
                'email' => 'required|email',
                'password' => [
                    'required',
                    'string',
                    new WithoutSpaces,
                    \Illuminate\Validation\Rules\Password::min(8)
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

            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));

                    $user->save();

                    event(new PasswordReset($user));
                }
            );

            if ($status == Password::PASSWORD_RESET) {
                return $this->response_message_success(__($status));
            }
            return $this->response_error(__($status), 422);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }
}
