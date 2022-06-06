<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\RespondsStatusTrait;
use App\Models\Order;
use App\Traits\ProductTrait;

class OrderController extends Controller
{
    use RespondsStatusTrait,ProductTrait;
    public function orderHistoryDetail(Request $request){
        try {
            $user = auth()->user();
            $id = $user->id;
            $posts_per_page = get_per_page($request->per_page);
            $order =  Order::with(['transaction','products'])->where('user_id',$id)->paginate($posts_per_page);
            foreach ($order as $value){
                $transaction = $value->transaction;
                $product = $value->products;
                foreach($product as $pro){
                    $item['product_name'] = $pro->name;
                    $item['product_image'] = $pro->product_image;
                    $item['price'] = $pro->price;
                    $data_product[] = $item; 
                }
                $item['total'] = $value->total;
                $item['total_tax'] = $value->total_tax;
                $item['shipping_full_name'] =$value->billing_full_name;
                $item['shipping_postal_code'] =$value->shipping_postal_code;
                $item['shipping_phone'] =$value->shipping_phone;
                $item['shipping_prefecture'] =$value->shipping_prefecture;
                $item['shipping_email'] =$value->shipping_email;
                $item['shipping_city'] =$value->shipping_city;
                $item['shipping_street_address'] =$value->shipping_street_address;
                $item['shipping_building'] =$value->shipping_building;
                $item['billing_full_name'] =$value->billing_full_name;
                $item['billing_postal_code'] =$value->billing_postal_code;
                $item['billing_city'] =$value->billing_city;
                $item['billing_prefecture'] =$value->billing_prefecture;
                $item['billing_street_address'] =$value->billing_street_address;
                $item['billing_building'] =$value->billing_building;
                $item['billing_phone'] =$value->billing_phone;
                $item['billing_email'] =$value->billing_email;
                $item['payment_mode'] =$transaction['payment_mode'];
                $item['created_at'] = date("Y/m/d",strtotime($value->created_at));
                $item['status'] = __($transaction['status']);
                $item['product'] = $data_product;
                $data_item[] = $item;  
            }
            return $this->responseData($data_item);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
