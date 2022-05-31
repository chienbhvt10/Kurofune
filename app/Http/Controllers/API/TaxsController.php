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
            $posts_per_page = config('constants.pagination.items_per_page');
            if ($request->name) {
                $tax = $this->filterScopeName(new Tax, $request->name)->paginate($posts_per_page);
            } else {
                $tax = Tax::paginate(10);
            }
            return $this->responseData($tax);
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
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
                return $this->errorResponse($errors, 442);
            }

            $tax = [
                'name' => $request->name,
                'value' => $request->value,
            ];

            $tax = Tax::create($tax);
            return $this->successWithData(__('message.tax.created'), $tax->first(), 200);

        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
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
            return $this->responseData($tax);
        }
        catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
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
                return $this->errorResponse($errors, 422);
            }

            $tax = Tax::find($id);
            $tax->name = $request->name;
            $tax->value = $request->value;
            $tax->save();
            return $this->successWithData(__('message.tax.update'), $tax);

        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
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
            return $this->success(__('message.tax.delete'));
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }
}

