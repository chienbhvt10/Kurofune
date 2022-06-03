<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use App\Enums\PageStatus;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Http\JsonResponse;
use App\Models\Page;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Traits\RespondsStatusTrait;
use App\Traits\CustomFilterTrait;

class PageController extends Controller
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
            $relational = 'page_translations';
            if ($request->name) {
                $page = $this->filterWhereHasName(new Page, $relational, $request->name, $posts_per_page);
            } else {
                $page = Page::paginate($posts_per_page);
            }
            return $this->responseData($page);
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
                'slug' => 'nullable|string|max:255',
                'status' =>  [Rule::in(['publish', 'draft']), 'required'],
                'en.title' => 'required|string'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
            $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->en['title']);
            $slug_check = check_unique_slug(new Page, $slug);
            if ($slug_check == false) {
                return $this->errorUniqueSlug();
            }
            $author_id = $request->author_id;
            $status = $request->status;
            $meta_title = $request->meta_title ?? null;
            $meta_description = $request->meta_description ?? null;
            $image = $request->image ?? null;
            $meta_keywords = $request->meta_keywords ?? null;
            if (!empty($image)) {
                $image_path = save_base_64_image($image, 'pages');
            }
            $data = [
                'author_id' => $author_id,
                'slug' => $slug,
                'status' => $status,
                'image' => $image_path ?? null,
                'meta_title' => $meta_title,
                'meta_description' => $meta_description,
                'meta_keywords' => $meta_keywords,
                'en' => [
                    'content' => $request->en['content'] ?? null,
                    'title' => $request->en['title'] ?? null,
                ],
                'ja' => [
                    'content' => $request->ja['content'] ?? null,
                    'title' => $request->ja['title'] ?? null,
                ],
                'vn' => [
                    'content' => $request->vi['content'] ?? null,
                    'title' => $request->vi['title'] ?? null,
                ],
                'tl' => [
                    'content' => $request->tl['content'] ?? null,
                    'title' => $request->tl['title'] ?? null,
                ],
                'zh' => [
                    'content' => $request->zh['content'] ?? null,
                    'title' => $request->zh['title'] ?? null,
                ],

            ];

            $page = Page::create($data);
            DB::commit();
            return $this->successWithData(__('message.page.created'), $page);
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
            $page = Page::find($id);
            if (!$page) {
                return $this->errorResponse(__('message.page.not_exist'), Response::HTTP_NOT_FOUND);
            }
            return $this->responseData($page);
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
            $page = Page::find($id);
            if (!$page) {
                return $this->errorResponse(__('message.page.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $validator = Validator::make($request->all(), [
                'slug' => 'nullable|string|max:255',
                'status' =>  [Rule::in(['publish', 'draft']), 'required'],
                'en.title' => 'required|string'
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }
            $slug = $request->slug ? Str::slug($request->slug) : Str::slug($request->en['title']);
            $slug_check = check_unique_slug_update(new Page, $slug, $id);
            if ($slug_check == false) {
                return $this->errorUniqueSlug();
            }
            $author_id = $request->author_id ?? null;
            $status = $request->status ?? null;
            $meta_title = $request->meta_title ?? null;
            $meta_description = $request->meta_description ?? null;
            $image_update = $request->image ?? null;
            $meta_keywords = $request->meta_keywords ?? null;
            if (!empty($image_update)) {
                $image_path = save_base_64_image($image_update, 'pages');
            }
            $page->update([
                'author_id' => $author_id,
                'slug' => $slug,
                'status' => $status,
                'image' => $image_path ?? null,
                'meta_title' => $meta_title,
                'meta_description' => $meta_description,
                'meta_keywords' => $meta_keywords,
                'en' => [
                    'content' => $request->en['content'] ?? null,
                    'title' => $request->en['title'] ?? null,
                ],
                'ja' => [
                    'content' => $request->ja['content'] ?? null,
                    'title' => $request->ja['title'] ?? null,
                ],
                'vn' => [
                    'content' => $request->vi['content'] ?? null,
                    'title' => $request->vi['title'] ?? null,
                ],
                'tl' => [
                    'content' => $request->tl['content'] ?? null,
                    'title' => $request->tl['title'] ?? null,
                ],
                'zh' => [
                    'content' => $request->zh['content'] ?? null,
                    'title' => $request->zh['title'] ?? null,
                ],
            ]);

            DB::commit();
            return $this->successWithData(__('message.page.updated'), $page);
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
            $page = page::find($id);
            $page->delete();
            return $this->success(__('message.page.deleted'));
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }

    public function getPageBySlug($slug): \Illuminate\Http\JsonResponse
    {
        try {
            $page = Page::where('slug', $slug)->first();
            if (!$page) {
                return $this->errorResponse(__('message.page.not_exist'), Response::HTTP_NOT_FOUND);
            }
            return $this->responseData($page);
        } catch (\Exception $error) {
            return $this->errorResponse($error->getMessage());
        }
    }
}
