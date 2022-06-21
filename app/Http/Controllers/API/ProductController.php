<?php

namespace App\Http\Controllers\API;

use App\Enums\Base;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Rules\WithoutSpaces;
use App\Traits\CustomFilterTrait;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use App\Rules\Base64Image;
use App\Traits\ProductTrait;

class ProductController extends Controller
{
    use RespondsStatusTrait, CustomFilterTrait,ProductTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $posts_per_page = get_per_page($request->per_page);
            $user = auth()->user();
            $roles = $user->getRoleNames()->first();
            $relational = 'product_translations';
            if ($request->name) {
                $product = $this->filterWhereHasName(new Product, $relational, $request->name, $posts_per_page);
            } else {
                $product = Product::paginate($posts_per_page);
            }
            if($roles == UserRole::ROLE_VENDOR) {
                if ($request->name) {
                    $product = $this->filterWhereHasName($user->products(), $relational, $request->name, $posts_per_page);
                } else {
                    $product = $user->products()->paginate($posts_per_page);
                }
            }
            $dataResponse = $product->toArray();
            foreach ($product as $key => $item) {
                $category = $item->categories()->get()->toArray();
                $dataResponse['data'][$key]['categories'] = $category;
                $vendorProfile = $item->user()->first()->vendor_profile();
                $dataResponse['data'][$key]['store'] = $vendorProfile->get()->toArray();
            }

            return $this->response_data_success($dataResponse);
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
            DB::beginTransaction();
            $validator = Validator::make($request->all(), [
                'sku' => 'nullable|unique:products',
                'price' => 'nullable|integer',
                'product_image' => ['nullable', new Base64Image],
                'en.name' => 'required',
                'ja.name' => 'required',
                'vi.name' => 'required',
                'tl.name' => 'required',
                'zh.name' => 'required',
                'cat_id' => 'required|array',
                'cat_id.*' => 'exists:App\Models\Category,id',
                'tax_id' => 'nullable|exists:App\Models\Tax,id',
                'stock_status' => ['required', Rule::in(['instock', 'outofstock'])],
                'status' => ['required', Rule::in(['publish', 'draft'])],
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }
            $slug = getSlug($request->en['name'], new Product, 'product_translations');
            $user = auth()->user();
            $user_id = $user->id;
            $roles = $user->getRoleNames()->first();

            if($roles == UserRole::ROLE_ADMIN) {
                $validator = Validator::make($request->all(), [
                    'user_id' => 'required'
                ]);
                if ($validator->fails()) {
                    DB::rollBack();
                    $errors = $validator->errors();
                    return $this->response_validate($errors);
                }
                $userVendor = User::whereHas('roles', function ($query){
                    return $query->where('name', '=', UserRole::ROLE_VENDOR);
                })->find($request->user_id);
                if(!$userVendor) {
                    return $this->response_error(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
                }
                $user_id = $userVendor->id;

            }
            $image_product = $request->product_image ? save_base_64_image($request->product_image, 'products') : null;
            $product = Product::create([
                'user_id' => $user_id,
                'slug' => $slug,
                'sku' => $request->sku,
                'status' => $request->status,
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
            return $this->response_message_data_success(__('message.product.created'), $product);

        } catch (\Exception $error) {
            DB::rollBack();
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
            $data = Product::find($id);
            if (empty($data)) {
                return $this->response_error(__('message.product.not_exist'), 404);
            }
            $data_cat = [];
            foreach ($data->categories as $item) {
                $cat_id = $item->id;
                array_push($data_cat, $cat_id);
            }
            $data['cat_arr'] = $data_cat;

            return $this->response_data_success($data);
        }catch (\Exception $error){
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
            DB::beginTransaction();
            $product = Product::findOrFail($id);
            if(!$product) {
                return $this->response_error(__('message.product.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $validator = Validator::make($request->all(), [
                'sku' => 'nullable|unique:products,sku,'.$product->id.',id',
                'price' => 'nullable|integer',
                'product_image' => ['nullable', new Base64Image],
                'en.name' => 'required',
                'ja.name' => 'required',
                'vi.name' => 'required',
                'tl.name' => 'required',
                'zh.name' => 'required',
                'cat_id' => 'required|array',
                'cat_id.*' => 'exists:App\Models\Category,id',
                'tax_id' => 'nullable|exists:App\Models\Tax,id',
                'stock_status' => ['required', Rule::in(['instock', 'outofstock'])],
                'status' => ['required', Rule::in(['publish', 'draft'])],
            ]);
            if ($validator->fails()) {
                DB::rollBack();
                $errors = $validator->errors();
                return $this->response_validate($errors);
            }

            $nameProduct = $product->product_translations
            ->where('locale', '=', 'en')->first()->name;
            $slug = $product->slug;
            if ($nameProduct != $request->en['name']) {
                $slug = $this->getSlug($request->en['name']);
            }
            $user = auth()->user();
            $user_id = $user->id;
            $roles = $user->getRoleNames()->first();

            if($roles == UserRole::ROLE_ADMIN) {
                $validator = Validator::make($request->all(), [
                    'user_id' => 'required'
                ]);
                if ($validator->fails()) {
                    DB::rollBack();
                    $errors = $validator->errors();
                    return $this->response_validate($errors);
                }
                $userVendor = User::whereHas('roles', function ($query){
                    return $query->where('name', '=', UserRole::ROLE_VENDOR);
                })->find($request->user_id);
                if(!$userVendor) {
                    return $this->response_error(__('message.user.not_exist'), Response::HTTP_NOT_FOUND);
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
            $image_product = $request->product_image;
            if($image_product) {
                $update_image_product = save_base_64_image($image_product, 'products');
                $data_update['product_image'] = $update_image_product;
            }
            $product->update($data_update);
            $product->categories()->sync($request->cat_id);
            DB::commit();
            return $this->response_message_data_success(__('message.product.updated'), $product);

        } catch (\Exception $error) {
            DB::rollBack();
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
            $product = Product::find($id);
            if(!$product) {
                return $this->response_error(__('message.product.not_exist'));
            }
            $product->sku = null;
            $product->save();
            $product->delete();
            return $this->response_message_success(__('message.product.deleted'));
        }catch (\Exception $error){
            return $this->response_exception();
        }
    }

    public function detailProduct($id)
    {
        try {
            $data = Product::find($id);
            if($data){
                $categories = $data->categories;
                $translations = $data -> translations;
                $response = [
                    'product_id' => $data->id,
                    'slug' => $data->slug,
                    'sku' => $data->sku,
                    'stock_status' => $data->stock_status,
                    'price' => $data->price,
                    'price_tax' =>  $this->get_price_including_tax($data),
                    'status' => $data->status,
                    'product_image' => $data->product_image,
                    'meta_title' => $data->meta_title,
                    'meta_description' => $data->meta_description,
                    'meta_keywords' => $data->meta_keywords,
                    'name' => $data->name,
                    'medicinal_efficacy_classification' => $data->medicinal_efficacy_classification,
                    'features' => $data->features,
                    'precautions' => $data->precautions,
                    'efficacy_effect' => $data->efficacy_effect,
                    'usage_dose' => $data->usage_dose,
                    'active_ingredients' => $data->active_ingredients,
                    'additives' => $data->additives,
                    'precautions_storage_handling' => $data->precautions_storage_handling,
                    'manufacturer' => $data->manufacturer,
                    'categories' => $categories,
                    'translations' => $translations,
                ];
                return $this->response_data_success($response);
            }       
            else{
                return $this->response_error(__('message.product.not_exist'), Response::HTTP_NOT_FOUND);
            }
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }
}
