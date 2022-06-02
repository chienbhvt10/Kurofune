<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Traits\RespondsStatusTrait;
use App\Models\Order;
use App\Models\Product;
use App\Traits\ProductTrait;

class OrderController extends Controller
{
     use RespondsStatusTrait,ProductTrait;
    public function orderHistory(){
        try {
            $posts_per_page = config('constants.pagination.items_per_page');
            $order =  Order::with(['transaction','products'])->paginate($posts_per_page);
            $data_item = [];
            foreach ($order as $value){
                $transaction = $value->transaction;
                $product = $value->product;
                $item['id'] = "OP-".sprintf('%08d',$value->id); 
                $item['total'] = $this->get_price_html($value->total);
                $item['total_tax'] =  $this->get_price_html($value->total_tax);
                $item['created_at'] = date("Y/m/d",strtotime($value->created_at));
                $item['status'] = $transaction->status;
                $item['name'] = $product->name;
                $item['product_image'] = $product->product_image;
                $data_item[] = $item;
            }
            return $this->responseData($data_item);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
