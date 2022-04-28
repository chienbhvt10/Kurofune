<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index(Request $request) {
        $users = User::whereHas('roles', function ($query) {
            return $query->where('name', '=', 'vendor');
        })->with(['vendor_profile'])->get();

        return response()->json($users);
    }
}
