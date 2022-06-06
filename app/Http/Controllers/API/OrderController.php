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
    public function orderHistory(Request $request){
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
                    $data_product[] = $item; 
                }
                $item['total'] = $value->total;
                $item['total_tax'] = $value->total_tax;
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
