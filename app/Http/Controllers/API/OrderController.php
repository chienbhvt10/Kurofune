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
    public function orderHistory(){
        try {
            $posts_per_page = config('constants.pagination.items_per_page');
            $order =  Order::with(['transaction','products'])->paginate($posts_per_page);
            foreach ($order as $value){
                $transaction = $value->transaction;
                $product = $value->products;
                $item['id'] = $this->get_order_number($value->id); 
                $item['total'] = $this->get_price_html($value->total);
                $item['total_tax'] = $this->get_price_html($value->total);
                $item['created_at'] = date("Y/m/d",strtotime($value->created_at));
                $item['status'] = __($transaction['status']);
                $item['product_image'] = ($product[0])['product_image'] ?? null;
                $item['product_name'] = ($product[0])['name'] ?? null;
                $data_item[] = $item;  
            }
            return $this->responseData($data_item);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
