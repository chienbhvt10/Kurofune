<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use \Illuminate\Http\JsonResponse;
use App\Traits\RespondsStatusTrait;

class RecycleBinController extends Controller
{
    use RespondsStatusTrait;

    public function getListDeleted(Request $request,$model)
    {
        try {
            $posts_per_page = get_per_page($request->per_page);
            $models = '\App\models\\'.$model;
            $data = $models::withTrashed()->paginate($posts_per_page);
            return $this->response_data_success($models);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function restoreEachDeleted(Request $request,$model,$id)
    {
        try {
            $retore = ('\App\models\\'.$model)::withTrashed()->find($id)->restore();
            return $this->response_data_success($retore);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function restoreListDeleted(Request $request,$model)
    {
        try {
            $ids = $request->ids;
            $retore = ('\App\models\\'.$model)::withTrashed()->whereIn('id',$ids)->restore();
            return $this->response_data_success ($retore);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    }

    public function forceDelete(Request $request ,$model)
    {
        try {
            $ids = [1];
            $retore = ('\App\models\\'.$model)::whereIn('id',$ids)->forceDelete();
            return $this->response_message_data_success($retore);
        } catch (\Exception $error) {
            return $this->response_exception();
        }
    } 
}
