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
            Route::apiResource('permissions', \App\Http\Controllers\API\PermissionController::class);
        });

        // User Manage
        Route::middleware(['permission:manage user'])->group(function () {
            Route::apiResource('users', \App\Http\Controllers\API\UserController::class);
            Route::post('import-user', [\App\Http\Controllers\API\ImportUserController::class, 'importUser']);
        });

        // Taxes
        Route::middleware(['permission:manage tax'])->group(function () {
            Route::apiResource('taxes',  \App\Http\Controllers\API\TaxsController::class);
        });

        // Category Manage
        Route::apiResource('categories', \App\Http\Controllers\API\CategoryController::class)->middleware('permission:manage product category');
        Route::get('get-list-deleted', [\App\Http\Controllers\API\CategoryController::class, 'getListDeleted']);
        Route::put('restore-list-deleted', [\App\Http\Controllers\API\CategoryController::class, 'restoreListDeleted']);
        Route::delete('force-delete', [\App\Http\Controllers\API\CategoryController::class, 'forceDelete']);
        


        // Product Manage
        Route::middleware(['permission:manage product'])->group(function () {
            Route::apiResource('products', \App\Http\Controllers\API\ProductController::class);
        });

        // Order Manage
        Route::middleware(['permission:manage order'])->group(function () {
            Route::apiResource('orders', \App\Http\Controllers\API\OrderController::class)->except(['store']);
        });

        // Page Manage
        Route::middleware(['permission:manage page'])->group(function () {
            Route::apiResource('pages', \App\Http\Controllers\API\PageController::class);
        });

        //Shipping Method Manger
        Route::middleware(['permission:manage shipping method'])->group(function () {
            Route::apiResource('shipping-methods', \App\Http\Controllers\API\ShippingMethodController::class);
        });

        // Chat log user manage
        Route::middleware('permission:manage chat log user')->group(function () {
            Route::get('list-chat-log', [\App\Http\Controllers\API\ChatLogUserController::class, 'listChatLog']);
            Route::get('detail-chat-log/{id}', [\App\Http\Controllers\API\ChatLogUserController::class, 'detailChatLog']);
            Route::get('export-chat-log-all', [\App\Http\Controllers\API\ChatLogUserController::class, 'allExportCsv']);
            Route::get('export-chat-log-user/{id}', [\App\Http\Controllers\API\ChatLogUserController::class, 'chatLogUser']);

            Route::get('list-log-question', [\App\Http\Controllers\API\LogQuestionController::class, 'listLogQuestion']);
            Route::get('export-log-question', [\App\Http\Controllers\API\LogQuestionController::class, 'exportLogQuestion']);
        });

        // View Profile
        Route::get('profile', ['App\Http\Controllers\API\UserController', 'profile'])->middleware('permission:view profile');

        Route::middleware(['user.active'])->group(function () {
            Route::middleware(['permission:user read online pharmacy'])->group(function () {
                // View Vendor
                Route::get('list-of-pharmacies', ['App\Http\Controllers\API\VendorProfileController', 'index']);
                Route::get('detail-pharmacy/{id}', [\App\Http\Controllers\API\VendorProfileController::class, 'detailPharmacy']);
                Route::get('product-of-pharmacy/{id}', [\App\Http\Controllers\API\VendorProfileController::class, 'productPharmacy']);
                Route::get('search-pharmacy', [\App\Http\Controllers\API\VendorProfileController::class, 'searchPharmacy']);

                // Billing, Shipping, Address manager
                Route::put('billing-address', [\App\Http\Controllers\API\BillingAddressController::class, 'update']);
                Route::put('shipping-address', [\App\Http\Controllers\API\ShippingAddressController::class, 'update']);

                // View medicine
                Route::get('list-category', [\App\Http\Controllers\API\CategoryController::class, 'listCategory']);
                Route::get('detail-category/{id}', [\App\Http\Controllers\API\CategoryController::class, 'detailCategory']);

                // View detail product
                Route::get('detail-product/{id}', [\App\Http\Controllers\API\ProductController::class, 'detailProduct']);

                // Cart process
                Route::get('cart', [\App\Http\Controllers\API\CartController::class, 'cartList']);
                Route::post('add-to-cart', [\App\Http\Controllers\API\CartController::class, 'addToCart']);
                Route::put('update-cart', [\App\Http\Controllers\API\CartController::class, 'updateCart']);

                Route::delete('delete-cart', [\App\Http\Controllers\API\CartController::class, 'deleteCart']);
                Route::delete('delete-cart-item/{id}', [\App\Http\Controllers\API\CartController::class, 'deleteCartItem']);

                // Checkout process
                Route::post('checkout', [\App\Http\Controllers\API\CartController::class, 'checkout']);

                //view shipping method
                Route::get('list-shipping-method', [\App\Http\Controllers\API\ShippingMethodController::class, 'listShippingmethod']);

                 //view order
                Route::get('order-history-detail/{id}', [\App\Http\Controllers\API\OrderController::class, 'orderHistoryDetail']);
                Route::get('order-history', [\App\Http\Controllers\API\OrderController::class, 'orderHistory']);
            });

            Route::middleware(['permission:user change profile'])->group(function () {
                Route::put('user-address', [\App\Http\Controllers\API\UserAddressController::class, 'update']);
                Route::put('change-password', ['App\Http\Controllers\API\ChangePasswordController', 'changePassword']);
            });

            Route::get('get-page-by-slug/{slug}', [\App\Http\Controllers\API\PageController::class, 'getPageBySlug']);

        });
    });

    Route::post('login', [\App\Http\Controllers\API\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\API\AuthController::class, 'register']);
    Route::post('forgot-password', [\App\Http\Controllers\API\ResetPasswordController::class, 'forgotPassword']);
    Route::post('reset-password', [\App\Http\Controllers\API\ResetPasswordController::class, 'resetPassword']);
});
