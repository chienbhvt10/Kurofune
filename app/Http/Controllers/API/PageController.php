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

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {


        try {
            $page = Page::all();
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
                'slug' => 'string|required',
                'status' =>  [Rule::in(['Publish', 'Draft']), 'required'],
                'image' => 'mimes:jpg,bmp,png',


            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                DB::rollBack();
                $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
            }


            $author_id = $request->author_id;
            $slug = Str::slug($request->slug);
            $status = $request->status;
            $meta_title = $request->meta_title ?? null;
            $meta_description = $request->meta_description ?? null;
            $image = $request->image ?? null;
            $meta_keywords = $request->meta_keywords ?? null;

            $data = [
                'author_id' => $author_id,
                'slug' => $slug,
                'status' => $status,
                'meta_title'=>$meta_title,
                'meta_description' => $meta_description,
                'image' => $image,
                'meta_keywords' => $meta_keywords,
            ];

            $page = Page::create($data);

            $data_page = [
                'en' => [
                    'content' => $request->en['content'] ?? null,
                    'title' => $request->en['title'] ?? null,

                ],
                'ja' => [
                    'content' => $request->ja['content'] ?? null,
                    'title' => $request->ja['title'] ?? null,

                ],
                'vn' => [
                    'content' => $request->vn['content'] ?? null,
                    'title' => $request->vn['title'] ?? null,

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
            $page_tran = $page->page_translations()->create($data_page);

            if ($image) {
                $page->addMedia($image)->toMediaCollection('image_1');
            }


            DB::commit();
            return $this->successWithData(__('message.page.create_success'), $page );
        } catch (\Exception $error) {
            DB::rollBack();
            $errors = $validator->errors();
                return $this->errorResponse($errors, 422);
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
                return response()->json([
                    'status_code' => Response::HTTP_NOT_FOUND,
                    'message' => __('message.page.not_exist')
                ]);
            }
            $image = $page->image;
            $page_image = getMediaImages($image, 'image_1');
            $data = [
                'author_id' => $page->author_id,
                'slug' => $page->slug,
                'status' => $page->status,
                'image' => $page_image,
                'meta_title'=>$page->meta_title,
                'meta_description' => $page->meta_description,
                'meta_keywords' => $page->meta_keywords,
            ];

            return response()->json([
                'status_code' => Response::HTTP_OK,
                'data' => $data 
            ]);
        } catch (\Exception $error) {
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
            $page = Page::find($id);
            if (!$page) {
                return response()->json([
                    'status_code' => Response::HTTP_NOT_FOUND,
                    'message' => __('message.page.not_exist')
                ]);
            }
            $validator = Validator::make($request->all(), [
                'slug' => 'string|required',
                'status' => [Rule::in(['publish', 'draft']), 'required'],
                'image' => 'mimes:jpg,bmp,png',
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors();
                return response()->json([
                    'status_code' => 422,
                    'message' => $errors
                ], 422);
            }

            $author_id = $request->author_id;
            $slug = Str::slug($request->slug);
            $status = $request->status;
            $meta_title = $request->meta_title ?? null;
            $meta_description = $request->meta_description ?? null;
            $image = $request->image ?? null;
            $meta_keywords = $request->meta_keywords ?? null;

            $page->update([
                'author_id' => $author_id,
                'slug' => $slug,
                'status' => $status,
                'image' => $image,
                'meta_title'=>$meta_title,
                'meta_description' => $meta_description,
                'meta_keywords' => $meta_keywords,
            ]);

            $data_page = [
                'en' => [
                    'content' => $request->en['content'] ?? null,
                    'title' => $request->en['title'] ?? null,

                ],
                'ja' => [
                    'content' => $request->ja['content'] ?? null,
                    'title' => $request->ja['title'] ?? null,

                ],
                'vn' => [
                    'content' => $request->vn['content'] ?? null,
                    'title' => $request->vn['title'] ?? null,

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
           
            if($page->page_translations){
                $page->page_translations->update($data_page);
            }
            
            if ($image) {
                $page->clearMediaCollection('image_1');
                $page->addMultipleMediaFromRequest($image)->toMediaCollection('image_1');
            }

            DB::commit();
            return $this->successWithData(__('message.page.update_success'), $page );
        } catch (\Exception $error) {
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
}