<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class CategoryController extends Controller
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
            $cat = Category::paginate($posts_per_page);

            return $this->responseData($cat);
        } catch (\Exception $error) {
            DB::rollback();
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
            $user = auth()->user();

            $validator = Validator::make($request->all(), [
                'parent_id' => 'nullable|numeric',
                'slug' => 'required|string|max:255',
                'category_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'type' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }

            $image = $request->file('category_image');
            $image_path = upload_single_image($image, 'category');

            $params = [
                'slug' => $request->slug,
                'category_image' => $image_path,
                'type' => $request->type,
                'parent_id' => $request->parent_id ?? '0',
                'en' => [
                    'name' => $request->en['name'] ?? 'Category en',
                ],
                'ja' => [
                    'name' => $request->ja['name'] ?? 'Category ja',
                ],
                'vi' => [
                    'name' => $request->vi['name'] ?? 'Category vi',
                ],
                'tl' => [
                    'name' => $request->tl['name'] ?? 'Category tl',
                ],
                'zh' => [
                    'name' => $request->zh['name'] ?? 'Category zh',
                ]
            ];

            $cat = $user->category()->create($params);
            DB::commit();

            return $this->successWithData(__('message.category.created'), $cat);
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
    public function show($id)
    {
        try {
            $cat = Category::find($id);

            if (empty($cat)) {
                return $this->errorResponse(__('message.category.not_exist'), Response::HTTP_NOT_FOUND);
            }

            return $this->responseData($cat);
        } catch (\Exception $error){
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
            $cat = Category::find($id);

            $params_update = [];

            if (empty($cat)) {
                return $this->errorResponse(__('message.category.not_exist'), Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'parent_id' => 'nullable|numeric',
                'slug' => 'required|string|max:255',
                'category_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'type' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }

            $image_update = $request->file('category_image');
            if ($image_update) {
                $image_path = upload_single_image($image_update, 'category');
                $params_update['category_image'] = $image_path;
            }

            $params_update = [
                'slug' => $request->slug,
                'type' => $request->type,
                'parent_id' => $request->parent_id ?? '0',
                'en' => [
                    'name' => $request->en['name'] ?? 'Category en',
                ],
                'ja' => [
                    'name' => $request->ja['name'] ?? 'Category ja',
                ],
                'vi' => [
                    'name' => $request->vi['name'] ?? 'Category vi',
                ],
                'tl' => [
                    'name' => $request->tl['name'] ?? 'Category tl',
                ],
                'zh' => [
                    'name' => $request->zh['name'] ?? 'Category zh',
                ]
            ];

            $cat->update($params_update);
            DB::commit();
            return $this->successWithData(__('message.category.updated'), $cat, Response::HTTP_OK);
        } catch (\Exception $error){
            DB::rollback();
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
            $cat = Category::find($id);
            $cat->delete();
            return $this->success(__('message.category.deleted'));
        } catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }
}
