<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Notifications\ChangeOrderStatusNotification;
use Illuminate\Http\Request;
use App\Traits\RespondsStatusTrait;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Response;
use App\Traits\ProductTrait;
use App\Enums\UserRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    use RespondsStatusTrait,ProductTrait;

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

            if($roles == UserRole::ROLE_VENDOR) {
                $order = $user->vendor_profile->orders()->with(['user', 'transaction'])->status($request)->orderNumber($request)->paginate($posts_per_page);
            }else{
                $order = Order::query()->with(['user', 'transaction'])->status($request)->orderNumber($request)->paginate($posts_per_page);
            }
            return $this->response_data_success($order);

        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = auth()->user();
            $roles = $user->getRoleNames()->first();

            if($roles == UserRole::ROLE_VENDOR) {
                $order = $user->vendor_profile->orders()->with(['user', 'transaction'])->where('id', $id)->get();
            }else{
                $order = Order::query()->with(['user', 'transaction'])->where('id', $id)->get();
            }
            return $this->response_data_success($order);

        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $order = Order::with(['user', 'transaction'])->find($id);
            $status = $order->transaction->status;
            $customer = $order->user;
            $user = auth()->user();
            $validator = Validator::make($request->all(), [
                'order_status' => ['required', 'string', Rule::in(['awaiting confirm', 'packing', 'delivery', 'shipping', 'completed'])],
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

            $order_status = $request->order_status;
            if($status !== $order_status) {
                $order->transaction()->update([
                    'status' => $order_status
                ]);
                Notification::sendNow($customer, new ChangeOrderStatusNotification($order, $order_status, $user));
            }
            $params = $request->all();
            $order->update($params);

            DB::commit();
            return $this->response_message_success(__('message.order.updated'));
        }catch (\Exception $e) {
            DB::rollBack();
            return $this->response_exception();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = Order::find($id);
            $user->delete();
            return $this->response_message_success(__('message.order.deleted'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }


    public function orderHistoryDetail(Request $request ,$order_id) : \Illuminate\Http\JsonResponse
    {
        try {
            $user = auth()->user();
            $id = $user->id;
            $order =  Order::with(['transaction','products'])->where('user_id',$id)->find($order_id);
            if($order == null){
                return $this->response_error(__('message.order.no_info'), 404);
            }else{
                $response = [];
                $transaction = $order->transaction;
                $order_item = [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'total'=>$order->total,
                    'total_tax'=>$order->total_tax,
                    'date_order' => $order->created_at,
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
                    'payment_mode' => __($transaction->payment_mode),
                    'status' => __($transaction->status),
                    'order_products' => [],
                ];
                foreach ($order->products as $prod) {
                    $product_data = [
                        'id' => $prod->id,
                        'name' => $prod->name,
                        'quantity' => $prod->pivot->quantity,
                        'price' => $prod->pivot->sub_total,
                        'total' => $prod->pivot->total,
                        'total_tax' => $prod->pivot->total_tax,
                    ];
                    $tax =  Product::with(['tax'])->where('tax_id',$prod->tax_id)->find($prod->id);
                    $value = ($tax->tax->value).'%';
                    $product_data['tax'] = $value;
                    array_push($order_item['order_products'], $product_data);
                }
                array_push($response, $order_item);
            return $this->response_data_success($response);
            }
            

        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function orderHistory(Request $request){
        try {
            $user = auth()->user();
            $id = $user->id;
            $posts_per_page = get_per_page($request->per_page);
            $order =  Order::with(['transaction','products'])->where('user_id',$id)->paginate($posts_per_page);
            if($order->isEmpty()){
                return $this->response_error(__('message.order.no_info'), 404);
            }else{
                $response = [];
                foreach ($order as $order) {
                    $transaction = $order->transaction;
                    $order_item = [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'total'=>$order->total,
                        'total_tax'=>$order->total_tax,
                        'date_order' => $order->created_at,
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
                        'payment_mode' => __($transaction->payment_mode),
                        'status' => __($transaction->status),
                        'order_products' => [],
                    ];
                    foreach ($order->products as $prod) {
                        $product_data = [
                            'id' => $prod->id,
                            'name' => $prod->name,
                            'quantity' => $prod->pivot->quantity,
                            'price' => $prod->pivot->sub_total,
                            'total' => $prod->pivot->total,
                            'total_tax' => $prod->pivot->total_tax,
                        ];
                        array_push($order_item['order_products'], $product_data);
                    }
                    array_push($response, $order_item);
                }
                return $this->response_data_success($response);
            }
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }
}
