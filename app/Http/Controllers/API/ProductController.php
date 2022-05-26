<?php

namespace App\Http\Controllers\API;

use App\Enums\Base;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Rules\WithoutSpaces;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class ProductController extends Controller
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
            $posts_per_page = config('constants.pagination.items_per_page');
            $user = auth()->user();
            $roles = $user->getRoleNames()->first();
            $product = Product::paginate($posts_per_page);
            if($roles == UserRole::ROLE_VENDOR) {
                $product = $user->products()->paginate($posts_per_page);
            }
            return $this->responseData($product);

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
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'slug' => 'nullable|unique:products',
                'sku' => 'nullable|unique:products',
                'price' => 'nullable|numeric',
                'product_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'en.name' => 'required',
                'cat_id' => 'required|array',
                'cat_id.*' => 'exists:App\Models\Category,id',
                'tax_id' => 'nullable|exists:App\Models\Tax,id',
                'stock_status' => ['required', Rule::in(['instock', 'outofstock'])],
                'status' => ['required', Rule::in(['publish', 'draft'])],
            ]);
            $slug = ($request->slug) ? Str::slug($request->slug) : Str::slug($request->en['name']);
            $user = auth()->user();
            $user_id = $user->id;
            $roles = $user->getRoleNames()->first();
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }

            if($roles == UserRole::ROLE_ADMIN) {
                $validator = Validator::make($request->all(), [
                    'user_id' => 'required'
                ]);
                if ($validator->fails()) {
                    DB::rollBack();
                    $errors = $validator->errors();
                    return $this->errorResponse($errors, 422);
                }
                $userVendor = User::whereHas('roles', function ($query){
                    return $query->where('name', '=', UserRole::ROLE_VENDOR);
                })->find($request->user_id);
                if(!$userVendor) {
                    return $this->errorResponse(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
                }
                $user_id = $userVendor->id;

            }
            $image_product = $request->file('product_image') ? upload_single_image($request->file('product_image'), 'products') : null;
            $product = Product::create([
                'user_id' => $user_id,
                'slug' => $slug,
                'sku' => $request->sku,
                'stock_status' => $request->stock_status,
                'price' => $request->price ?? null,
                'product_image' => $image_product,
                'tax_id' => $request->tax_id ?? null,
                'meta_title' => $request->meta_title ?? null,
                'meta_description' => $request->meta_description ?? null,
                'meta_keywords' => $request->meta_keywords ?? null,
                'en' => [
                    'name' => $request->en['name'],
                    'medicinal_efficacy_classification' => $request->en['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->en['features'] ?? null,
                    'precautions' => $request->en['precautions'] ?? null,
                    'efficacy_effect' => $request->en['efficacy_effect'] ?? null,
                    'usage_dose' => $request->en['usage_dose'] ?? null,
                    'active_ingredients' => $request->en['active_ingredients'] ?? null,
                    'additives' => $request->en['additives'] ?? null,
                    'precautions_storage_handling' => $request->en['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->en['manufacturer'] ?? null,
                ],
                'ja' => [
                    'name' => $request->ja['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->ja['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->ja['features'] ?? null,
                    'precautions' => $request->ja['precautions'] ?? null,
                    'efficacy_effect' => $request->ja['efficacy_effect'] ?? null,
                    'usage_dose' => $request->ja['usage_dose'] ?? null,
                    'active_ingredients' => $request->ja['active_ingredients'] ?? null,
                    'additives' => $request->ja['additives'] ?? null,
                    'precautions_storage_handling' => $request->ja['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->ja['manufacturer'] ?? null,
                ],
                'vi' => [
                    'name' => $request->vi['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->vi['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->vi['features'] ?? null,
                    'precautions' => $request->vi['precautions'] ?? null,
                    'efficacy_effect' => $request->vi['efficacy_effect'] ?? null,
                    'usage_dose' => $request->vi['usage_dose'] ?? null,
                    'active_ingredients' => $request->vi['active_ingredients'] ?? null,
                    'additives' => $request->vi['additives'] ?? null,
                    'precautions_storage_handling' => $request->vi['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->vi['manufacturer'] ?? null,
                ],
                'tl' => [
                    'name' => $request->tl['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->tl['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->tl['features'] ?? null,
                    'precautions' => $request->tl['precautions'] ?? null,
                    'efficacy_effect' => $request->tl['efficacy_effect'] ?? null,
                    'usage_dose' => $request->tl['usage_dose'] ?? null,
                    'active_ingredients' => $request->tl['active_ingredients'] ?? null,
                    'additives' => $request->tl['additives'] ?? null,
                    'precautions_storage_handling' => $request->tl['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->tl['manufacturer'] ?? null,
                ],
                'zh' => [
                    'name' => $request->zh['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->zh['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->zh['features'] ?? null,
                    'precautions' => $request->zh['precautions'] ?? null,
                    'efficacy_effect' => $request->zh['efficacy_effect'] ?? null,
                    'usage_dose' => $request->zh['usage_dose'] ?? null,
                    'active_ingredients' => $request->zh['active_ingredients'] ?? null,
                    'additives' => $request->zh['additives'] ?? null,
                    'precautions_storage_handling' => $request->zh['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->zh['manufacturer'] ?? null,
                ],
            ]);
            $product->categories()->sync($request->cat_id);
            DB::commit();
            return $this->successWithData(__('message.product.created'), $product);

        } catch (\Exception $error) {
            DB::rollBack();
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
            $product = Product::find($id);
            return $this->responseData($product);
        }catch (\Exception $error){
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
            DB::beginTransaction();
            $product = Product::findOrFail($id);
            if(!$product) {
                return $this->errorResponse(__('message.product.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $validator = Validator::make($request->all(), [
                'slug' => 'nullable|unique:products,slug,'.$product->id.',id',
                'sku' => 'nullable|unique:products,sku,'.$product->id.',id',
                'price' => 'nullable|numeric',
                'product_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'en.name' => 'required',
                'cat_id' => 'required|array',
                'cat_id.*' => 'exists:App\Models\Category,id',
                'tax_id' => 'nullable|exists:App\Models\Tax,id',
                'stock_status' => ['required', Rule::in(['instock', 'outofstock'])],
                'status' => ['required', Rule::in(['publish', 'draft'])],
            ]);
            $slug = ($request->slug) ? Str::slug($request->slug) : Str::slug($request->en['name']);
            $user = auth()->user();
            $user_id = $user->id;
            $roles = $user->getRoleNames()->first();
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }

            if($roles == UserRole::ROLE_ADMIN) {
                $validator = Validator::make($request->all(), [
                    'user_id' => 'required'
                ]);
                if ($validator->fails()) {
                    DB::rollBack();
                    $errors = $validator->errors();
                    return $this->errorResponse($errors, 422);
                }
                $userVendor = User::whereHas('roles', function ($query){
                    return $query->where('name', '=', UserRole::ROLE_VENDOR);
                })->find($request->user_id);
                if(!$userVendor) {
                    return $this->errorResponse(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
                }
                $user_id = $userVendor->id;
            }
            $data_update = [
                'user_id' => $user_id,
                'slug' => $slug,
                'sku' => $request->sku,
                'stock_status' => $request->stock_status,
                'status' => $request->status,
                'price' => $request->price ?? null,
                'tax_id' => $request->tax_id ?? null,
                'meta_title' => $request->meta_title ?? null,
                'meta_description' => $request->meta_description ?? null,
                'meta_keywords' => $request->meta_keywords ?? null,
                'en' => [
                    'name' => $request->en['name'],
                    'medicinal_efficacy_classification' => $request->en['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->en['features'] ?? null,
                    'precautions' => $request->en['precautions'] ?? null,
                    'efficacy_effect' => $request->en['efficacy_effect'] ?? null,
                    'usage_dose' => $request->en['usage_dose'] ?? null,
                    'active_ingredients' => $request->en['active_ingredients'] ?? null,
                    'additives' => $request->en['additives'] ?? null,
                    'precautions_storage_handling' => $request->en['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->en['manufacturer'] ?? null,
                ],
                'ja' => [
                    'name' => $request->ja['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->ja['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->ja['features'] ?? null,
                    'precautions' => $request->ja['precautions'] ?? null,
                    'efficacy_effect' => $request->ja['efficacy_effect'] ?? null,
                    'usage_dose' => $request->ja['usage_dose'] ?? null,
                    'active_ingredients' => $request->ja['active_ingredients'] ?? null,
                    'additives' => $request->ja['additives'] ?? null,
                    'precautions_storage_handling' => $request->ja['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->ja['manufacturer'] ?? null,
                ],
                'vi' => [
                    'name' => $request->vi['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->vi['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->vi['features'] ?? null,
                    'precautions' => $request->vi['precautions'] ?? null,
                    'efficacy_effect' => $request->vi['efficacy_effect'] ?? null,
                    'usage_dose' => $request->vi['usage_dose'] ?? null,
                    'active_ingredients' => $request->vi['active_ingredients'] ?? null,
                    'additives' => $request->vi['additives'] ?? null,
                    'precautions_storage_handling' => $request->vi['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->vi['manufacturer'] ?? null,
                ],
                'tl' => [
                    'name' => $request->tl['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->tl['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->tl['features'] ?? null,
                    'precautions' => $request->tl['precautions'] ?? null,
                    'efficacy_effect' => $request->tl['efficacy_effect'] ?? null,
                    'usage_dose' => $request->tl['usage_dose'] ?? null,
                    'active_ingredients' => $request->tl['active_ingredients'] ?? null,
                    'additives' => $request->tl['additives'] ?? null,
                    'precautions_storage_handling' => $request->tl['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->tl['manufacturer'] ?? null,
                ],
                'zh' => [
                    'name' => $request->zh['name'] ?? null,
                    'medicinal_efficacy_classification' => $request->zh['medicinal_efficacy_classification'] ?? null,
                    'features' => $request->zh['features'] ?? null,
                    'precautions' => $request->zh['precautions'] ?? null,
                    'efficacy_effect' => $request->zh['efficacy_effect'] ?? null,
                    'usage_dose' => $request->zh['usage_dose'] ?? null,
                    'active_ingredients' => $request->zh['active_ingredients'] ?? null,
                    'additives' => $request->zh['additives'] ?? null,
                    'precautions_storage_handling' => $request->zh['precautions_storage_handling'] ?? null,
                    'manufacturer' => $request->zh['manufacturer'] ?? null,
                ],
            ];
            $image_product = $request->file('product_image') ?? null;
            if($image_product) {
                $image_product = upload_single_image($image_product, 'products');
                $data_update['image_product'] = $image_product;
            }
            $product->update($data_update);
            $product->categories()->sync($request->cat_id);
            DB::commit();
            return $this->successWithData(__('message.product.updated'), $product);

        } catch (\Exception $error) {
            DB::rollBack();
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
            $product = Product::find($id);
            if(!$product) {
                return $this->errorResponse(__('message.product.not_exist'));
            }
            $product->delete();
            return $this->success(__('message.product.deleted'));
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }

    public function detailProduct($id)
    {
        try {
            $data = Product::find($id);
            if (empty($data)) {
                return $this->errorResponse(__('message.product.not_exist'), Response::HTTP_NOT_FOUND);
            }
            return $this->responseData($data);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
