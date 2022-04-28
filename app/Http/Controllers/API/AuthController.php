<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'email|required',
                'password' => 'required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
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
                return response([
                    'status_code' => 401,
                    'message' => __('auth.failed')
                ],401);
            }

            $tokenResult = $user->createToken('authToken')->plainTextToken;
            $user->login_counter++;
            $user->save();

            return response()->json([
                'status_code' => 200,
                'access_token' => $tokenResult,
                'token_type' => 'Bearer',
                'user' => $user
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => 500,
                'message' => $error->getMessage()
            ], 500);
        }

    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json([
                'status' => 200,
                'message' => __('message.user.logout')
            ]);
    }

    public function register(Request $request) {

    }
}
