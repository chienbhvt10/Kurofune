<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleController extends Controller
{

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
            return response()->json([
                'status_code' => 200,
                'data' => $roles
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }

            $role = Role::findOrCreate($request->role_name, 'api');
            return response()->json([
                'status_code' => 200,
                'message' => 'message.role.created',
                'data' => $role
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
            return response()->json([
                'status_code' => 200,
                'data' => $role
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }

            $role = Role::findById($id, 'api');
            $role->name = $request->role_name;
            $role->save();
            return response()->json([
                'status_code' => 200,
                'message' => __('message.role.updated'),
                'data' => $role
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
            return response()->json([
                'status_code' => 200,
                'message' => __('message.role.deleted')
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getPermissionByRole(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        try {
            $role = Role::findById($id, 'api');

            $permission = $role->permissions();
            return response()->json([
                'status_code' => Response::HTTP_OK,
                'data' => ['role' => $role, 'permissions' => $permission->getResults()]
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                return response()->json([
                    'status_code' => Response::HTTP_UNPROCESSABLE_ENTITY,
                    'message' => $errors
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            $role = Role::findById($request->role_id, 'api');
            $getPermissions = $role->permissions()->getResults()->pluck('name');
            $role->revokePermissionTo($getPermissions);
            $role->syncPermissions($request->permissions);
            return response()->json([
                'status_code' => 200,
                'message' => __('message.permission.updated'),
                'data' => ['role' => $role]
            ]);
        }catch (\Exception $error){
            return response()->json([
                'status_code' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $error->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
