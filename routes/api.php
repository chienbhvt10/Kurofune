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
            Route::get('get-permission-by-role/{id}', [\App\Http\Controllers\API\RoleController::class, 'getPermissionByRole']);
            Route::put('update-permission-for-role', [\App\Http\Controllers\API\RoleController::class, 'updatePermissionForRole']);
            Route::apiResource('permissions', \App\Http\Controllers\API\PermissionController::class );
        });

        // User Manage
        Route::middleware(['permission:manage user'])->group(function () {
            Route::apiResource('users', \App\Http\Controllers\API\UserController::class);
            Route::post('import-user', [\App\Http\Controllers\API\ImportUserController::class, 'importUser']);
        });

        // Category Manager
        Route::apiResource('category', \App\Http\Controllers\API\CategoryController::class)->middleware('permission:manage product category');

        // Product Manage
        Route::middleware(['permission:manage product'])->group(function () {
            Route::apiResource('products', \App\Http\Controllers\API\ProductController::class);
        });

        // View Profile
        Route::get('profile', ['App\Http\Controllers\API\UserController', 'profile'])->middleware('permission:view profile');

        Route::middleware(['user.active'])->group(function (){
            Route::middleware(['permission:user read online pharmacy'])->group(function (){
                // View Vendor
                Route::get('list-of-pharmacies', ['App\Http\Controllers\API\VendorProfileController', 'index']);

                // Billing, Shipping, Address manager
                Route::put('billing-address', [\App\Http\Controllers\API\BillingAddressController::class, 'update']);
                Route::put('shipping-address', [\App\Http\Controllers\API\ShippingAddressController::class, 'update']);
            });

            Route::middleware(['permission:user change profile'])->group(function () {
                Route::put('user-address', [\App\Http\Controllers\API\UserAddressController::class, 'update']);
                Route::put('change-password', ['App\Http\Controllers\API\ChangePasswordController', 'changePassword']);
            });
        });
    });

    Route::post('login', [\App\Http\Controllers\API\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\API\AuthController::class, 'register']);
    Route::post('forgot-password', [\App\Http\Controllers\API\ResetPasswordController::class, 'forgotPassword']);
    Route::post('reset-password', [\App\Http\Controllers\API\ResetPasswordController::class, 'resetPassword']);
});
