<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['language'])->prefix('v1')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {

        // Logout
        Route::post('logout', [\App\Http\Controllers\API\AuthController::class, 'logout']);

        // Permission manager
        Route::middleware(['permission:manage permission'])->group(function () {
            Route::apiResource('roles', \App\Http\Controllers\API\RoleController::class);
            Route::get('getPermissionByRole/{id}', [\App\Http\Controllers\API\RoleController::class, 'getPermissionByRole']);
            Route::put('updatePermissionForRole', [\App\Http\Controllers\API\RoleController::class, 'updatePermissionForRole']);
            Route::apiResource('permissions', \App\Http\Controllers\API\PermissionController::class );
        });

        // User Manage
        Route::middleware(['permission:manage user'])->group(function () {
            Route::apiResource('users', \App\Http\Controllers\API\UserController::class);
            Route::post('importUser', [\App\Http\Controllers\API\ImportUserController::class, 'importUser']);
        });

        // View Profile
        Route::get('profile', ['App\Http\Controllers\API\UserController', 'profile'])->middleware('permission:view profile');

        // View Vendor
        Route::get('listOfPharmacies', ['App\Http\Controllers\API\VendorController', 'index'])->middleware(['permission:view list vendor']);

        // Billing, Shipping, Address manager
        Route::middleware('permission:update user address')->group(function () {
            Route::put('billingAddress', [\App\Http\Controllers\API\BillingAddressController::class, 'update']);
            Route::put('shippingAddress', [\App\Http\Controllers\API\ShippingAddressController::class, 'update']);
            Route::put('userAddress', [\App\Http\Controllers\API\UserAddressController::class, 'update']);
        });
    });

    Route::post('login', [\App\Http\Controllers\API\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\API\AuthController::class, 'register']);
});
