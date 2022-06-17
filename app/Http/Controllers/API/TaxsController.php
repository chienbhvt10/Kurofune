<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Http\JsonResponse;
use App\Traits\RespondsStatusTrait;
use Illuminate\Support\Facades\DB;
use App\Models\Tax;
use App\Traits\CustomFilterTrait;

class TaxsController extends Controller
{
    use RespondsStatusTrait, CustomFilterTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $posts_per_page = get_per_page($request->per_page);
            if ($request->name) {
                $tax = $this->filterScopeName(new Tax, $request->name)->paginate($posts_per_page);
            } else {
                $tax = Tax::paginate($posts_per_page);
            }
            return $this->response_data_success($tax);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'string|required',
                'value'=> 'numeric|required'
            ]);

            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $tax_params = [
                'name' => $request->name,
                'value' => $request->value,
            ];

            $tax = Tax::create($tax_params);
            return $this->response_message_data_success(__('message.tax.created'), $tax->first());

        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $tax = Tax::find($id);
            return $this->response_data_success($tax);
        }
        catch (\Exception $error){
            return $this->response_exception();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'value' => 'required|numeric'
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $tax = Tax::find($id);
            $tax->name = $request->name;
            $tax->value = $request->value;
            $tax->save();
            return $this->response_message_data_success(__('message.tax.update'), $tax);

        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $tax = Tax::find($id);
            $tax->delete();
            return $this->response_message_success(__('message.tax.delete'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }
}

