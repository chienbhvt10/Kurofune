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

class ShippingMethodController extends Controller
{

    use RespondsStatusTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        try {
            $posts_per_page = config('constants.pagination.items_per_page');
            $shipping = ShippingMethod::paginate($posts_per_page);
             return $this->responseData($shipping);
        } catch (\Exception $error) {
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
        try {
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'name' => 'string|max:191',
                'description' =>  'string|max:191',
                'total' => 'numeric|regex:^(?:[1-9]\d{1,12}+|\d)(?:\,\d\d)?$' 
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
          
            $name = $request->name;
            $total = $request->total;
            $description = $request->description ?? null;
            $logo = $request->file('logo') ?? null;
            if(!empty($logo)){
                $logo_path = upload_single_image($logo, 'shippingmethod');
                $data['logo'] = $logo_path; 
            }
            $data = [
                'name' => $name,
                'total' => $total,
                'description' => $description,
                'logo'=>$logo,
            ];

            $shippingmethod = ShippingMethod::create($data);
            DB::commit();
            return $this->successWithData(__('message.shippingmethod.create_success'), $shippingmethod );
        } catch (\Exception $error) {
            DB::rollback();
            return $this->errorResponse($error->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request ,$id)
    {
        try {
            $shippingmethod = ShippingMethod::find($id); 
            if (!$shippingmethod) {
                return $this->errorResponse(__('message.shippingmethod.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $logo = $shippingmethod->logo ?? null;

            $data = [
                'name' => $shippingmethod->name,
                'total' => $shippingmethod->total,
                'description' => $shippingmethod->description,
                'logo' => $logo,
            ];

            return $this->responseData($data);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
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
            $ShippingMethod = ShippingMethod::find($id);
            if (!$ShippingMethod) {
                return $this->errorResponse(__('message.shippingmethod.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $validator = Validator::make($request->all(), [
                'name' => 'string|max:191',
                'description' =>  'string|max:191',
                'total' => 'numeric|regex:^(?:[1-9]\d{1,12}+|\d)(?:\,\d\d)?$'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
            $name = $request->name;
            $total = $request->total;
            $description = $request->description ?? null;
            $logo_update = $request->file('logo');
            if (!empty($logo_update)) {
                $logo_path = upload_single_image($logo_update, 'page');
                $ShippingMethod['image'] = $logo_path; 
            }
            $ShippingMethod->update([
                'name' => $name,
                'total' => $total,
                'description' => $description,
            ]);

            DB::commit();
            return $this->successWithData(__('message.shippingmethod.update_success'), $ShippingMethod );
        } catch (\Exception $error) {
            DB::rollBack();
            return $this->errorResponse($error->getMessage());
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
            $shippingmethod = shippingmethod::find($id);
            $shippingmethod->delete();
            return $this->success(__('message.shippingmethod.delete_success'));
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
