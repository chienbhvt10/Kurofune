<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use App\Models\ChatLogUser;
use Exception;

class CronDataChatLog extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cron:dataChatLog';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cron data chat log user and imsert to database from chatbot';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->cronLogChatUser();
        Log::info("Cron is working fine!");
    }

    public function syncGetLogChat($data)
    {
        $data_request = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response = Http::withHeaders([
            'Cache-control' => 'no-cache',
            'Content-Type' => 'application/json',
            env('API_KEY') => env('API_VALUE')
        ])->send('POST', env('API_URL'), [
            'body' => $data_request
        ])->body();

        if (!empty($response)) {
            return json_decode($response);
        } else {
            return false;
        }
    }

    public function getDataLog()
    {
        try {
            $current_time = date("Y-m-d 00:00:00");
            $start_time = date('Y-m-d 15:00:00', strtotime("-2 day", strtotime($current_time)));
            $end_time = date('Y-m-d 15:00:00', strtotime("-1 day", strtotime($current_time)));
            $data_request = array(
                'start_time' => $start_time,
                'end_time' => $end_time,
                'cpid' => '61792ae247e39e694a190fa6'
            );
            $data_response = $this->syncGetLogChat($data_request);

            if (!empty($data_response)) {
                $data = [];
                foreach ($data_response as $value) {
                    $logs = $value->logs;

                    $data_log = [];

                    foreach ($logs as $log) {
                        $message = null;
                        $message_ja = null;
                        if (is_array($log->message)) {
                            $message = $log->message[0]->text;
                            $message_ja = $log->message_ja[0]->text;
                            if (!empty($message)) {
                                $list_messages = array(
                                    'admin' => true,
                                    'message' => $message,
                                    'message_ja' => $message_ja,
                                    'type' => '',
                                    'time' => $log->time_of_message
                                );
                            }
                        } else {
                            if (isset($log->message->attachment->payload)) {
                                if (isset($log->message->attachment->payload->text)) {
                                    $message = $log->message->attachment->payload->text;
                                    $message_ja = $log->message_ja->attachment->payload->text;
                                    if (!empty($message)) {
                                        if (isset($log->message->attachment->payload->buttons) && $log->message->attachment->payload->buttons[0]->type == "web_url") {
                                            $list_messages = array(
                                                'admin' => true,
                                                'message' => $message,
                                                'message_ja' => $message_ja,
                                                'type' => 'web_url',
                                                'url' => $log->message->attachment->payload->buttons[0]->url,
                                                'time' => $log->time_of_message
                                            );
                                        } else {
                                            $list_messages = array(
                                                'admin' => true,
                                                'message' => $message,
                                                'message_ja' => $message_ja,
                                                'type' => '',
                                                'time' => $log->time_of_message
                                            );
                                        }
                                    }
                                } else {
                                    if ($log->message->attachment->type == "image") {
                                        $list_messages = array(
                                            'admin' => true,
                                            'image' => $log->message->attachment->payload->url,
                                            'url_image' => $log->message->attachment->payload->url_image,
                                            'type' => 'image',
                                            'time' => $log->time_of_message
                                        );
                                    }
                                }
                            } else {
                                if (isset($log->message->text)) {
                                    $list_messages = array(
                                        'admin' => false,
                                        'message' => $log->message->text,
                                        'message_ja' => $log->message_ja->text,
                                        'type' => '',
                                        'time' => $log->time_of_message
                                    );
                                } else {
                                    $message = $log->message;
                                    $message_ja = $log->message_ja;

                                    if (!empty($message)) {
                                        $list_messages = array(
                                            'admin' => false,
                                            'message' => $message,
                                            'message_ja' => $message_ja,
                                            'type' => '',
                                            'time' => $log->time_of_message
                                        );
                                    }
                                }
                            }
                        }
                        $data_log[] = $list_messages;
                    }
                    $user_id = null;
                    if (!empty($value->sys_user_id)) {
                        $user_id = (int)$value->sys_user_id;
                    }
                    if ($user_id) {
                        $data[] = array(
                            "cpid" => $value->cpid,
                            "user_id" => $user_id,
                            "data_log" => $data_log
                        );
                    }
                }
                return $data;
            }
        } catch (Exception $error) {
            Log::error($error->getMessage());
        }
    }

    public function insertLogToDatabase($data)
    {
        try {
            DB::beginTransaction();

            foreach ($data as $item) {
                $data_item = [
                    'cpid' => $item['cpid'],
                    'user_id' => $item['user_id'],
                    'data_log' => json_encode($item['data_log']),
                ];
                ChatLogUser::create($data_item);
            }

            DB::commit();
        } catch (Exception $error) {
            DB::rollBack();
            Log::error($error->getMessage());
        }
    }

    public function cronLogChatUser()
    {
        $data = $this->getDataLog();
        if(!empty($data)) {
            $this->insertLogToDatabase($data);
        }
    }
}
