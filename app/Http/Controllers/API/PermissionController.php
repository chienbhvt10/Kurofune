<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    use RespondsStatusTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $permissions = Permission::all();
            return $this->response_data_success($permissions);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'permission_name' => 'string|required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $permission = Permission::findOrCreate($request->permission_name, 'api');
            return $this->response_message_data_success(__('message.permission.created'), $permission);
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
            $permission = Permission::findById($id, 'api');
            return $this->response_data_success($permission);
        }catch (\Exception $error){
            return $this->response_exception();
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
            $validator = Validator::make($request->all(), [
                'permission_name' => 'string|required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $permission = Permission::findById($id, 'api');
            $permission->name = $request->permission_name;
            $permission->save();
            return $this->response_message_data_success(__('message.permission.updated'), $permission);
        }catch (\Exception $error){
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
            $permission = Permission::findById($id, 'api');
            $permission->delete();
            return $this->response_message_success(__('message.permission.deleted'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }
}
