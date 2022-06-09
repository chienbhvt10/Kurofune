<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\User;
use App\Models\VendorProfile;
use App\Notifications\VendorNewOrderNotification;
use App\Notifications\CustomerProcessingOrderNotification;
use App\Traits\ProductTrait;
use App\Traits\RespondsStatusTrait;
use Carbon\Carbon;
use Cartalyst\Stripe\Stripe as Stripe;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CartController extends Controller
{
    use RespondsStatusTrait, ProductTrait;

    public function cartList(): \Illuminate\Http\JsonResponse
    {
        try {
            $user = auth()->user();
            $cart = Cart::where('user_id', $user->id)->first();
            if(!$cart){
                return $this->response_message_success(__('message.cart.no_info'));
            }else{
                $key = $cart->key;
                $cart_items = $cart->cart_items;
                $data_item = [];
                foreach ($cart_items as $value){
                    $product = $value->product;
                    $item['id'] = $value->id;
                    $item['name'] = $product->name;
                    $item['quantity'] = $value->quantity;
                    $item['price'] = (float)$product->price;
                    $item['price_tax'] = $this->get_price_including_tax($product);
                    $item['product_image'] = $product->product_image;
                    $data_item[] = $item;
                }
                $data = [
                    'key' => $key,
                    'total' => $cart_items->count(),
                    'cart_item' => $data_item
                ];
                return $this->response_data_success($data);
            }
        }catch (\Exception $error){
            dd($error);
            return $this->response_exception();
        }
    }

    public function addToCart(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $validator = Validator::make($request->all(), [
                'product_id' => 'required|exists:App\Models\Product,id',
                'anket_1' => 'required|integer',
                'anket_2' => 'required|integer',
                'anket_3' => 'required|integer',
                'anket_4' => 'required|integer',
                'anket_6' => 'required|integer',
                'anket_7' => 'nullable|string',
                'anket_8' => 'required|string',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }
            if((bool)$request->anket_4) {
                $validator = Validator::make($request->all(), [
                    'anket_5' => 'required|string'
                ]);
                if ($validator->fails()) {
                    DB::rollBack();
                    $errors = $validator->errors();
                    return $this->response_validate($errors);
                }
            }
            $cart = Cart::where('user_id', $user->id)->first();
            if($cart){
                $cart_item = $cart->cart_items()->where('product_id', $request->product_id)->first();
                if($cart_item){
                    $quantity = ++$cart_item->quantity;
                    $cart_item->update([
                        'quantity' => $quantity,
                        'anket_1' => $request->anket_1,
                        'anket_2' => $request->anket_2,
                        'anket_3' => $request->anket_3,
                        'anket_4' => $request->anket_4,
                        'anket_5' => strip_tags($request->anket_5),
                        'anket_6' => $request->anket_6,
                        'anket_7' => strip_tags($request->anket_7),
                        'anket_8' => strip_tags($request->anket_8),
                        ]);
                }else{
                    $cart->cart_items()->create([
                        'id' => generate_uuid(),
                        'product_id' => $request->product_id,
                        'quantity' => 1,
                        'anket_1' => $request->anket_1,
                        'anket_2' => $request->anket_2,
                        'anket_3' => $request->anket_3,
                        'anket_4' => $request->anket_4,
                        'anket_5' => strip_tags($request->anket_5),
                        'anket_6' => $request->anket_6,
                        'anket_7' => strip_tags($request->anket_7),
                        'anket_8' => strip_tags($request->anket_8),
                    ]);
                }
            }else{
                $id = generate_uuid();
                $key = md5(uniqid(rand(), true));
                $user_id = $user->id;
                $cart = Cart::create([
                    'id' => $id,
                    'key' => $key,
                    'user_id' => $user_id
                ]);

                $cart->cart_items()->create([
                    'id' => generate_uuid(),
                    'product_id' => $request->product_id,
                    'quantity' => 1,
                    'anket_1' => $request->anket_1,
                    'anket_2' => $request->anket_2,
                    'anket_3' => $request->anket_3,
                    'anket_4' => $request->anket_4,
                    'anket_5' => $request->anket_5,
                    'anket_6' => $request->anket_6,
                    'anket_7' => $request->anket_7,
                    'anket_8' => $request->anket_8,
                ]);
            }
            $product = Product::find($request->product_id);
            DB::commit();
            return $this->response_message_data_success(__('message.cart.add', ['product_name' => $product->name ]), $cart);
        }catch (\Exception $error){
            DB::rollBack();
            return $this->response_exception();
        }
    }

    public function updateCart(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'cart_items' => 'required|array',
//                'cart_items.*.quantity' => 'integer|min:1'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $user = auth()->user();
            $cart = Cart::where('user_id', $user->id)->first();
            if($cart){
                $cart_items = $request->cart_items;
                foreach ($cart_items as $item){
                    if(!isset($item['quantity']) || !isset($item['id']) || !is_integer($item['quantity']) || $item['quantity'] < 1 ) {
                        return $this->errorResponse(__('message.cart.quantity'));
                    }
                    $cart_item = CartItem::find($item['id']);
                    $cart_item->quantity = $item['quantity'];
                    $cart_item->save();
                }
                DB::commit();
                return $this->response_message_success(__('message.cart.updated'));
            }
            return $this->response_error(__('message.cart.no_info'), \Illuminate\Http\Response::HTTP_NOT_FOUND);
        }catch (\Exception $error){
            DB::rollBack();
            return $this->response_exception();
        }
    }

    public function deleteCartItem($id): \Illuminate\Http\JsonResponse
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $cart = Cart::where('user_id', $user->id)->first();
            if($cart){
                $cart_item = $cart->cart_items->find($id);
                if($cart_item) {
                    $cart_item->delete();
                    if($cart->cart_items->count() - 1 == 0) {
                        $cart->delete();
                    }
                    DB::commit();
                    return $this->response_message_success(__('message.cart.deleted'));
                }else{
                    return $this->response_error(__('message.cart.no_info'), \Illuminate\Http\Response::HTTP_NOT_FOUND);
                }
            }
            return $this->response_error(__('message.cart.no_info'), \Illuminate\Http\Response::HTTP_NOT_FOUND);
        }catch (\Exception $error){
            DB::rollBack();
            return $this->response_exception();
        }
    }

    public function deleteCart(): \Illuminate\Http\JsonResponse
    {
        try {
            $user = auth()->user();
            $cart = Cart::where('user_id', $user->id)->first();
            if($cart){
                $cart->delete();
                return $this->response_message_success(__('Delete cart success'));
            }
            return $this->response_error(__('message.cart.no_info'), \Illuminate\Http\Response::HTTP_NOT_FOUND);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    public function makeTransaction(Order $order, $status = 'awaiting confirm', $mode = 'cod') {
        $transaction = new Transaction();
        $transaction->id = generate_uuid();
        $transaction->order_id = $order->id;
        $transaction->status = $status;
        $transaction->payment_mode = $mode;
        $transaction->save();
    }

    public function checkout(Request $request) {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            $validator = Validator::make($request->all(), [
                'payment_mode' => ['required', 'string', Rule::in(['cod'])],
                'shipping_full_name' => 'required|string',
                'shipping_postal_code' => 'required|string',
                'shipping_city' => 'required|string',
                'shipping_prefecture' => 'required|string',
                'shipping_street_address' => 'required|string',
                'shipping_building' => 'required|string',
                'shipping_phone' => 'required|string',
                'shipping_email' => 'required|string',
                'billing_full_name' => 'required|string',
                'billing_postal_code' => 'required|string',
                'billing_city' => 'required|string',
                'billing_prefecture' => 'required|string',
                'billing_street_address' => 'required|string',
                'billing_building' => 'required|string',
                'billing_phone' => 'required|string',
                'billing_email' => 'required|string',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $cart = Cart::where('user_id', $user->id)->first();
            if(empty($cart)) {
                return $this->response_error(__('message.cart.no_info'), \Illuminate\Http\Response::HTTP_NOT_FOUND);
            }else{
                $cart_items = $cart->cart_items;
                $cart_data_with_shop = [];

                foreach ($cart_items as $item) {
                    $product = $item->product;
                    $price = $product->price;
                    $price_tax = $this->get_price_including_tax($product);
                    $quantity = $item->quantity;
                    $vendor_id = $item->product->user->vendor_profile->id;

                    $tmp[$vendor_id]['product_items'][] = [
                        'product_id' => $product->id,
                        'quantity' => $quantity,
                        'anket_1' => $item->anket_1,
                        'anket_2' => $item->anket_2,
                        'anket_3' => $item->anket_3,
                        'anket_4' => $item->anket_4,
                        'anket_5' => $item->anket_5,
                        'anket_6' => $item->anket_6,
                        'anket_7' => $item->anket_7,
                        'anket_8' => $item->anket_8,
                        'sub_total_tax' => (float)$price_tax,
                        'sub_total' => (float)$price,
                        'total_tax' => (float) $price_tax * $quantity,
                        'total' =>(float) $price * $quantity,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ];
                    $cart_data_with_shop = $tmp;
                }

                foreach ($cart_data_with_shop as $key => $value) {
                    $vendor_profile_id = $key;
                    $product_items = $value['product_items'];

                    $order = Order::create([
                        'user_id' => $user->id,
                        'vendor_profile_id' => $vendor_profile_id,
                        'shipping_full_name' => $request->shipping_full_name,
                        'shipping_postal_code' => $request->shipping_postal_code,
                        'shipping_city' => $request->shipping_city,
                        'shipping_prefecture' => $request->shipping_prefecture,
                        'shipping_street_address' => $request->shipping_street_address,
                        'shipping_building' => $request->shipping_building,
                        'shipping_phone' => $request->shipping_phone,
                        'shipping_email' => $request->shipping_email,
                        'billing_full_name' => $request->billing_full_name,
                        'billing_postal_code' => $request->shipping_postal_code,
                        'billing_city' => $request->shipping_city,
                        'billing_prefecture' => $request->shipping_prefecture,
                        'billing_street_address' => $request->shipping_street_address,
                        'billing_building' => $request->shipping_building,
                        'billing_phone' => $request->shipping_phone,
                        'billing_email' => $request->shipping_email,
                    ]);
                    $order->products()->attach($product_items);

                    if($request->payment_mode == 'cod') {
                        $this->makeTransaction($order);
                    }
                    $order->load('products');
                    $order->load('transaction');
                    $vendor = VendorProfile::find($vendor_profile_id)->user;

                    Notification::sendNow($vendor, new VendorNewOrderNotification($order, $user));
                    Notification::sendNow($user, new CustomerProcessingOrderNotification($order, $user));
                }

                $this->resetCart($cart);
                DB::commit();
                return $this->response_message_success('success');
            }
//            $stripe = Stripe::make(env('STRIPE_KEY'));
//            $token = $stripe->tokens()->create([
//                'card' => [
//                    'number'    => '4242424242424242',
//                    'exp_month' => 10,
//                    'cvc'       => 314,
//                    'exp_year'  => 2022,
//                ],
//            ]);
//            return $this->responseData($token);
//            $customer = $stripe->customers()->create([
//                'name' => 'thanh',
//                'email' => 'thanh@test.com',
//                'phone' => '123456789',
//                'source' => $token['id'],
//            ]);
//
//            $charge = $stripe->charges()->create([
//                'customer' => $customer['id'],
//                'currency' => 'JPY',
//                'amount' => 12000,
//                'description' => 'Payment demo'
//            ]);
//            return $this->responseData($charge['status']);
        }catch (\Exception $e) {
            DB::rollBack();
            return $this->response_exception();
        }
    }
}
