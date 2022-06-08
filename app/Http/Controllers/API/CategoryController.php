<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Traits\CustomFilterTrait;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use App\Rules\Base64Image;

class CategoryController extends Controller
{
    use RespondsStatusTrait, CustomFilterTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $posts_per_page = get_per_page($request->per_page);
            $relational = 'category_translations';
            if ($request->name) {
                $cat = $this->filterWhereHasName(new Category, $relational, $request->name, $posts_per_page);
            } else {
                $cat = Category::paginate($posts_per_page);
            }

            return $this->response_data_success($cat);
        } catch (\Exception $error) {
            DB::rollback();
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
            $user = auth()->user();

            $validator = Validator::make($request->all(), [
                'parent_id' => 'nullable|numeric',
                'slug' => 'nullable|string|max:255',
                'category_image' => ['required', new Base64Image],
                'type' => 'required|numeric',
                'en.name' => 'required|string'
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->en['name']);
            $slug_check = check_unique_slug(new Category, $slug);
            if ($slug_check == false) {
                return $this->errorUniqueSlug();
            }

            $image = $request->category_image;
            $image_path = save_base_64_image($image, 'category');

            $params = [
                'slug' => $slug,
                'category_image' => $image_path,
                'type' => $request->type,
                'parent_id' => $request->parent_id ?? '0',
                'en' => [
                    'name' => $request->en['name'],
                ],
                'ja' => [
                    'name' => $request->ja['name'] ?? null,
                ],
                'vi' => [
                    'name' => $request->vi['name'] ?? null,
                ],
                'tl' => [
                    'name' => $request->tl['name'] ?? null,
                ],
                'zh' => [
                    'name' => $request->zh['name'] ?? null,
                ]
            ];

            $cat = $user->categories()->create($params);
            DB::commit();

            return $this->response_message_data_success(__('message.category.created'), $cat);
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
            $cat = Category::find($id);

            if (empty($cat)) {
                return $this->response_error(__('message.category.not_exist'), Response::HTTP_NOT_FOUND);
            }

            return $this->response_data_success($cat);
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
            $cat = Category::find($id);

            $params_update = [];

            if (empty($cat)) {
                return $this->response_error(__('message.category.not_exist'), Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'parent_id' => 'nullable|numeric',
                'slug' => 'nullable|string',
                'category_image' => ['nullable', new Base64Image],
                'type' => 'required|numeric',
                'en.name' => 'required|string'
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->en['name']);
            $slug_check = check_unique_slug_update(new Category, $slug, $id);
            if ($slug_check == false) {
                return $this->errorUniqueSlug();
            }

            $params_update = [
                'slug' => $slug,
                'type' => $request->type,
                'parent_id' => $request->parent_id ?? '0',
                'en' => [
                    'name' => $request->en['name'],
                ],
                'ja' => [
                    'name' => $request->ja['name'] ?? null,
                ],
                'vi' => [
                    'name' => $request->vi['name'] ?? null,
                ],
                'tl' => [
                    'name' => $request->tl['name'] ?? null,
                ],
                'zh' => [
                    'name' => $request->zh['name'] ?? null,
                ]
            ];

            $image_update = $request->category_image;
            if ($image_update) {
                $image_path = save_base_64_image($image_update, 'category');
                $params_update['category_image'] = $image_path;
            }

            $cat->update($params_update);
            DB::commit();
            return $this->response_message_data_success(__('message.category.updated'), $cat);
        } catch (\Exception $error) {
            DB::rollback();
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
            $cat = Category::find($id);
            $cat->delete();
            return $this->response_message_success(__('message.category.deleted'));
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function listCategory(Request $request)
    {
        try {
            if ($request->type) {
                $dataList = Category::where('type', $request->type)->get();
            } else {
                $dataList = Category::all();
            }

            foreach ($dataList as $item) {
                $item->category_image = get_image_url($item->category_image);
            }

            if ($dataList->first()) {
                return $this->response_data_success($dataList);
            } else {
                return $this->response_error(__('message.medicine.not_found'));
            }
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function detailCategory($id)
    {
        try {
            $cat = Category::find($id);

            if (empty($cat)) {
                return $this->response_error(__('message.category.not_exist'), Response::HTTP_NOT_FOUND);
            }

            $products = $cat->products()->where('status', 'publish')->with('categories')->get();

            return $this->response_data_success($products);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }
}
