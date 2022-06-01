<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function orderHistory(){
        try {
            $posts_per_page = config('constants.pagination.items_per_page');
            $order = Order::with(['orderproduct','transaction'])->get();
            return $this->responseData($order);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
