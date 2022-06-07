<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\RespondsStatusTrait;
use App\Models\Order;
use Illuminate\Http\Response;
use App\Traits\ProductTrait;

class OrderController extends Controller
{
    use RespondsStatusTrait,ProductTrait;
    public function orderHistory(Request $request){
        try {
            $user = auth()->user();
            $id = $user->id;
            $posts_per_page = get_per_page($request->per_page);
            $order =  Order::with(['transaction','products'])->where('user_id',$id)->paginate($posts_per_page);
            $response = [];
            foreach ($order as $order) {
                $transaction = $order->transaction;
                $order_item = [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'total'=>$order->total,
                    'total_tax'=>$order->total_tax,
                    'date_order' => formatDate($order->created_at),
                    'billing_full_name' => $order->billing_full_name,
                    'billing_postal_code' => $order->billing_postal_code,
                    'billing_city' => $order->billing_city,
                    'billing_prefecture' => $order->billing_prefecture,
                    'billing_street_address' => $order->billing_street_address,
                    'billing_building' => $order->billing_building,
                    'billing_phone' => $order->billing_phone,
                    'billing_email' => $order->billing_email,
                    'shipping_full_name' => $order->shipping_full_name,
                    'shipping_postal_code' => $order->shipping_postal_code,
                    'shipping_city' => $order->shipping_city,
                    'shipping_prefecture' => $order->shipping_prefecture,
                    'shipping_street_address' => $order->shipping_street_address,
                    'shipping_building' => $order->shipping_building,
                    'shipping_phone' => $order->shipping_phone,
                    'shipping_email' => $order->shipping_email,
                    'payment_mode' => $transaction->payment_mode,
                    'payment_mode' => __($transaction->status),
                    'order_products' => [],
                ];
                foreach ($order->products as $prod) {
                    $product_data = [
                        'id' => $prod->id,
                        'name' => $prod->name,
                        'quantity' => $prod->pivot->quantity,
                        'price' => $prod->price,
                        'total' => $prod->pivot->quantity * $prod->price,
                    ];
                    array_push($order_item['order_products'], $product_data);
                }
                array_push($response, $order_item);
            } 
            return $this->response_data_success($response);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }
}
