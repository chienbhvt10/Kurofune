<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ChatLogUser;
use App\Models\User;
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

            return $this->response_data_success($response);
        } else {
            return $this->response_error(__('Not found data'), 404);
        }
    }

    public function detailChatLog($id)
    {
        $chat_log = ChatLogUser::find($id);
        if (!empty($chat_log)) {
            $chat_log->data_log = json_decode($chat_log->data_log) ?? null;
            $response = [
                'user_name' => $chat_log->users->name ?? null,
                'user_avatar' => $chat_log->users->avatar ?? null,
                'data_log' => $chat_log->data_log
            ];

            return $this->response_data_success($response);
        } else {
            return $this->response_error(__('Not found data'), 404);
        }
    }

    public function allExportCsv(Request $request)
    {
        $export_ja = $request->export_ja ?? null;

        $results = ChatLogUser::all();
        if (empty($results)) {
            return $this->response_error(__('Not found data'), 404);
        }
        $file_name = "chat_log_export_" . date("Y_m_d") . ".csv";
        $headers = array(
            "Content-Encoding" => "sjis-win",
            "Content-Disposition" => "attachment; filename=$file_name",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        $csv_header = ['No.', "ユーザーID", "ユーザー名", "チャット履歴", "作成日", "更新日"];

        $callback = function () use ($csv_header, $results, $export_ja) {
            $file = fopen('php://output', 'w');
            fputs($file, "\xEF\xBB\xBF");
            fputcsv($file, $csv_header);
            $i = 0;
            foreach ($results as $item) {
                $i++;
                $data = [];
                $user_id = $item->user_id;
                $data_logs = json_decode($item->data_log);
                $user_name = $item->users->name ?? null;
                $log = [];
                foreach ($data_logs as $item_log) {
                    $label = ($item_log->admin) ? "question:" : "answer:";
                    if (isset($item_log->type) && $item_log->type == "image") {
                        $str = "{date: '" . date('Y/m/d', strtotime($item_log->time)) . "', $label '" . $item_log->image . "'}";
                    } else {
                        if (!empty($export_ja) && ($export_ja == 'true')) {
                            $str = "{date: '" . date('Y/m/d', strtotime($item_log->time)) . "', $label '" . $item_log->message_ja . "'}";
                        } else {
                            $str = "{date: '" . date('Y/m/d', strtotime($item_log->time)) . "', $label '" . $item_log->message . "'}";
                        }
                    }
                    $log[] = $str;
                }
                $data[] = $i;
                $data[] = $user_id;
                $data[] = $user_name;
                $data[] = "[" . implode("\r\n", $log) . "]";
                $data[] = date('Y/m/d', strtotime($item->created_at));
                $data[] = date('Y/m/d', strtotime($item->updated_at));
                fputcsv($file, $data, ',', '"');
            }
            fclose($file);
        };
        $headers = ['Content-Type: application/csv'];

        return response()->stream($callback, 200, $headers);
    }

    public function chatLogUser(Request $request, $id)
    {
        $export_ja = $request->export_ja ?? null;

        $results = ChatLogUser::find($id);
        if (empty($results)) {
            return $this->response_error(__('Not found data'), 404);
        }
        $user = User::find($results->user_id);
        $data_logs = json_decode($results->data_log);

        $file_name = "User_" . $id . "_chat_log_export_" . date("Y_m_d") . ".csv";
        $csv_header = ['No.', "ユーザーID", "ユーザー名", "チャット履歴", "作成日", "更新日"];
        $headers = array(
            "Content-type"        => "text/csv",
            "Content-Encoding" => "sjis-win",
            "Content-Disposition" => "attachment; filename=$file_name",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        );
        $log = [];

        $callback = function () use ($id, $csv_header, $data_logs, $results, $user, $log, $export_ja) {
            $file = fopen('php://output', 'w');
            fputs($file, "\xEF\xBB\xBF");
            fputcsv($file, $csv_header);
            foreach ($data_logs as $item_log) {
                $label = ($item_log->admin) ? "question:" : "answer:";
                if (isset($item_log->type) && $item_log->type == "image") {
                    $str = "{date: '" . date('Y/m/d', strtotime($item_log->time)) . "', $label '" . $item_log->image . "'}";
                } else {
                    if (!empty($export_ja) && ($export_ja == 'true')) {
                        $str = "{date: '" . date('Y/m/d', strtotime($item_log->time)) . "', $label '" . $item_log->message_ja . "'}";
                    } else {
                        $str = "{date: '" . date('Y/m/d', strtotime($item_log->time)) . "', $label '" . $item_log->message . "'}";
                    }
                }
                $log[] = $str;
            }
            $i = 0;
            $data = [];
            $data[] = $i;
            $data[] = $id;
            $data[] = $user->name ?? '';
            $data[] = "[" . implode("\r\n", $log) . "]";
            $data[] = date('Y/m/d', strtotime($results->created_at));
            $data[] = date('Y/m/d', strtotime($results->updated_at));
            fputcsv($file, $data, ',', '"');
            fclose($file);
        };
        $headers = ['Content-Type: application/csv'];
        return response()->stream($callback, 200, $headers);
    }
}
