<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use RespondsStatusTrait;

    public function login(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'email|required',
                'password' => 'required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
//            $credentials = request(['email', 'password']);
//
//            if (!Auth::attempt($credentials)) {
//                return response()->json([
//                    'status_code' => 401,
//                    'message' =>  __('auth.failed'),
//                ], 401);
//            }

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return $this->errorResponse(__('auth.failed'), 401);
            }

            $tokenResult = $user->createToken('authToken')->plainTextToken;
            $user->login_counter++;
            $user->save();
            $roles = $user->roles;
            $user = [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'email_verified_at' => $user->email_verified_at,
                'active' => $user->avatar,
                'avatar' => $user->phone,
                'login_counter' => $user->login_counter,
                'roles' => [
                    'id' => $roles[0]->id,
                    'name' => $roles[0]->name,
                ]
            ];

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }

    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return $this->success(__('message.user.logout'));
    }

    public function register(Request $request) {

    }
}
