<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use RespondsStatusTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $posts_per_page = get_per_page($request->per_page);
            $user = auth()->user();
            $roles = $user->getRoleNames()->first();
            $orders = Order::with(['products', 'transaction'])->paginate($posts_per_page);
            if($roles == UserRole::ROLE_VENDOR) {
                $orders = $user->vendor_profile->orders;
                $orders->load('products');
                $orders->load('transaction');
            }
            return $this->responseData($orders);

        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
