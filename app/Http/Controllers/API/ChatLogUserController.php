<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ChatLogUser;
use Illuminate\Http\Request;
use App\Traits\RespondsStatusTrait;

class ChatLogUserController extends Controller
{
    use RespondsStatusTrait;

    public function listChatLog()
    {
        $data_log = ChatLogUser::all();
        $response = [];

        if (!empty($data_log)) {
            foreach ($data_log as $log) {
                $log_item = [
                    'id' => $log->id,
                    'user_id' => $log->user_id,
                    'name_user' => $log->users->name ?? null,
                    'create_date' => formatDate($log->created_at)
                ];
                array_push($response, $log_item);
            }

            return $this->responseData($response);
        } else {
            return $this->errorResponse(__('Not found data'));
        }
    }

    public function detailChatLog(Request $request)
    {
        $id = $request->id;

        $chat_log = ChatLogUser::find($id);
        if (!empty($chat_log)) {
            $chat_log->data_log = json_decode($chat_log->data_log) ?? null;
            $response = [
                'user_name' => $chat_log->users->name ?? null,
                'data_log' => $chat_log->data_log
            ];

            return $this->responseData($response);
        } else {
            return $this->errorResponse(__('Not found data'));
        }
    }
}
