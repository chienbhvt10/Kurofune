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

class PageController extends Controller
{
    use RespondsStatusTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $posts_per_page = config('constants.pagination.items_per_page');
            $page = Page::paginate($posts_per_page);
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
            if ($request->slug) {
                $slug = Str::slug($request->slug);
            } else {
                $slug = Str::slug($request->en['title']);
            }
            $author_id = $request->author_id;
            $status = $request->status;
            $meta_title = $request->meta_title ?? null;
            $meta_description = $request->meta_description ?? null;
            $image = $request->file('image') ?? null;
            $meta_keywords = $request->meta_keywords ?? null;
            if($image){
                $image_path = upload_single_image($image, 'page');
            }
            $data = [
                'author_id' => $author_id,
                'slug' => $slug,
                'status' => $status,
                'image' => $image_path,
                'meta_title'=>$meta_title,
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
            return $this->successWithData(__('message.page.create_success'), $page );
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
    public function show(Request $request, $id)
    {
        try {
            $page = Page::find($id);
            if (!$page) {
                return $this->errorResponse(__('message.page.not_exist'), Response::HTTP_NOT_FOUND);
            }
            $image = $page->avatar ?? null;
            $image = get_avatar_url($image);
            
            $data = [
                'author_id' => $page->author_id,
                'slug' => $page->slug,
                'status' => $page->status,
                'image' => $image,
                'meta_title'=>$page->meta_title,
                'meta_description' => $page->meta_description,
                'meta_keywords' => $page->meta_keywords,
                'title' => $page->title,
                'content' => $page->content,
            ];

            return $this->responseData($data);
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
            if ($request->slug) {
                $slug = Str::slug($request->slug);
            } else {
                $slug = Str::slug($request->en['title']);
            }
            $author_id = $request->author_id;
            $status = $request->status;
            $meta_title = $request->meta_title ?? null;
            $meta_description = $request->meta_description ?? null;
            $image_update = $request->file('image');
            $meta_keywords = $request->meta_keywords ?? null;
            if ($image_update) {
                $image_path = upload_single_image($image_update, 'page');
            }
            $page->update([
                'author_id' => $author_id,
                'slug' => $slug,
                'status' => $status,
                'image' => $image_path,
                'meta_title'=>$meta_title,
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
            return $this->successWithData(__('message.page.update_success'), $page );
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
            return $this->success(__('message.page.delete_success'));
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
        }catch (\Exception $error){
            return $this->errorResponse($error->getMessage());
        }
    }
}