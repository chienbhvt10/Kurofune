<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleController extends Controller
{
    use RespondsStatusTrait;

    public function __construct()
    {
        // Reset cached roles and permissions
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $roles = Role::all();
            return $this->response_data_success($roles);
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
                'role_name' => 'string|required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $role = Role::findOrCreate($request->role_name, 'api');
            return $this->response_message_data_success(__('message.role.created'), $role);
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
            $id = (int)$id;
            $role = Role::findById($id, 'api');
            return $this->response_data_success($role);
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
                'role_name' => 'string|required'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $role = Role::findById($id, 'api');
            $role->name = $request->role_name;
            $role->save();
            return $this->response_message_data_success(__('message.role.updated'), $role);
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
            $role = Role::findById($id, 'api');
            $role->delete();
            return $this->response_message_success(__('message.role.deleted'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    public function getPermissionByRole(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        try {
            $role = Role::findById($id, 'api');

            $permission = $role->permissions();
            return $this->response_data_success(['role' => $role, 'permissions' => $permission->getResults()]);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    public function updatePermissionForRole(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $permissions = Permission::all()->pluck('name')->toArray();

            $validator = Validator::make($request->all(), [
                'role_id' => 'numeric|required',
                'permissions' => ['required', 'array', Rule::in($permissions)]
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }
            $role = Role::findById($request->role_id, 'api');
            $getPermissions = $role->permissions()->getResults()->pluck('name');
            $role->revokePermissionTo($getPermissions);
            $role->syncPermissions($request->permissions);
            return $this->response_message_data_success(__('message.permission.updated'), ['role' => $role]);
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }
}
