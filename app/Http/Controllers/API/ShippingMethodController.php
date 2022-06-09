<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Http\JsonResponse;
use App\Models\ShippingMethod;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Traits\RespondsStatusTrait;
use App\Rules\Base64Image;

class ShippingMethodController extends Controller
{

    use RespondsStatusTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $posts_per_page = get_per_page($request->per_page);
            $shipping_method = ShippingMethod::paginate($posts_per_page);
            return $this->response_data_success($shipping_method);
        } catch (\Exception $error) {
            return $this->response_exception();
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
        try {
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:191',
                'description' =>  'required|string|max:191',
                'image' =>  new Base64Image,
                'total' => 'numeric'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                DB::rollBack();
                return $this->response_validate($errors);
            }

            $name = $request->name ?? null;
            $total = $request->total ?? null;
            $description = $request->description ?? null;
            $logo = $request->logo ?? null;
            if (!empty($logo)) {
                $logo_path = save_base_64_image($logo, 'shippingmethods');
            }
            $data = [
                'name' => $name,
                'total' => $total,
                'description' => $description,
                'logo' => $logo_path ?? null
            ];

            $shipping_method = ShippingMethod::create($data);
            DB::commit();
            return $this->response_message_data_success(__('message.shipping_method.created'), $shipping_method);
        } catch (\Exception $error) {
            DB::rollback();
            return $this->response_exception();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $shipping_method = ShippingMethod::find($id);
            if (!$shipping_method) {
                return $this->response_error(__('message.shipping_method.not_exist'), Response::HTTP_NOT_FOUND);
            }
            return $this->response_data_success($shipping_method);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
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
        try {
            DB::beginTransaction();
            $shipping_method = ShippingMethod::find($id);
            $params_update = [];
            if (!$shipping_method) {
                return $this->response_error(__('message.shipping_method.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:191',
                'description' =>  'required|string|max:191',
                'image' =>  new Base64Image,
                'total' => 'numeric'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $name = $request->name ?? null;
            $total = $request->total ?? null;
            $description = $request->description ?? null;
            $logo_update = $request->logo ?? null;
            if (!empty($logo_update)) {
                $logo_update = save_base_64_image($logo_update, 'shippingmethods');
                $shipping_method->logo = $logo_update;
            }
            $params_update = [
                'name' => $name,
                'total' => $total,
                'description' => $description,
            ];

            $shipping_method->update($params_update);
            DB::commit();
            return $this->response_message_data_success(__('message.shipping_method.updated'), $shipping_method);
        } catch (\Exception $error) {
            DB::rollBack();
            return $this->response_exception();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $shipping_method = ShippingMethod::find($id);
            $shipping_method->delete();
            return $this->response_message_success(__('message.shipping_method.deleted'));
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function listShippingmethod()
    {
        try {
            $shipping_method = ShippingMethod::all();
            return $this->response_data_success($shipping_method);
        } catch (\Exception $error) {
            return $this->response_exception($error->getMessage());
        }
    }
}
