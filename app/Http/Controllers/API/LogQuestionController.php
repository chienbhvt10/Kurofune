<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;

class LogQuestionController extends Controller
{
    use RespondsStatusTrait;

    public function listLogQuestion()
    {
        $orders = Order::with('user', 'products')->get();
        $response = $this->getDataOrder($orders);

        return $this->response_data_success($response);
    }

    public function exportLogQuestion(Request $request)
    {
        $order_id = $request->order_id;
        $export = $request->export;
        $orders = Order::with('user', 'products')->get();
        $file_name = "chat_log_questionnaire_" . date("Y_m_d") . ".csv";
        $csv_header = [
            "ユーザ名",
            "ユーザメール",
            "注文商品",
            "注文番号",
            "注文日",
            "個数",
            "金額",
            "あなたの性別は何ですか？",
            "あなたの年齢を教えてください？",
            "このお薬を使ったことはありますか？",
            "今までにお薬を飲んで副作用を起こしたことはありますか？",
            "その時に使っていたお薬の名前はなんですか？",
            "現在治療中の病気はありますか？",
            "何か相談したいことはありますか？",
            "請求先氏名",
            "請求先郵便番号",
            "請求先都道府県",
            "請求先市区町村",
            "請求先丁目・番地・号",
            "請求先建物名・部屋番号",
            "請求先電話番号",
            "請求先メールアドレス",
            "お届け先氏名",
            "お届け先郵便番号",
            "お届け先都道府県",
            "お届け先市区町村",
            "お届け先丁目・番地・号",
            "お届け先建物名・部屋番号",
            "お届け先電話番号",
            "お届け先メールアドレス",
        ];

        $results = [];
        $response = $this->getDataOrder($orders);

        if (isset($export) && ($export == 'all') && (!isset($order_id))) {
            foreach ($response as $item) {
                foreach ($item['order_products'] as $prod) {
                    $result = [
                        $item['name'],
                        $item['user_email'],
                        $prod['name'],
                        $item['order_number'],
                        $prod['quantity'],
                        $prod['total'],
                        $prod['anket_1'],
                        $prod['anket_2'],
                        $prod['anket_3'],
                        $prod['anket_4'],
                        $prod['anket_5'],
                        $prod['anket_6'],
                        $prod['anket_8'],
                        $item['billing_full_name'],
                        $item['billing_postal_code'],
                        $item['billing_city'],
                        $item['billing_prefecture'],
                        $item['billing_street_address'],
                        $item['billing_building'],
                        $item['billing_phone'],
                        $item['billing_email'],
                        $item['shipping_full_name'],
                        $item['shipping_postal_code'],
                        $item['shipping_city'],
                        $item['shipping_prefecture'],
                        $item['shipping_street_address'],
                        $item['shipping_building'],
                        $item['shipping_phone'],
                        $item['shipping_email'],
                    ];
                    array_push($results, $result);
                }
            }
        } else {
            if (isset($order_id)) {
                foreach ($response as $item) {
                    if ($item['id'] == $order_id) {
                        $single_order = $item;
                        foreach ($single_order['order_products'] as $prod) {
                            $result = [
                                $item['name'],
                                $item['user_email'],
                                $prod['name'],
                                $item['order_number'],
                                $prod['quantity'],
                                $prod['total'],
                                $prod['anket_1'],
                                $prod['anket_2'],
                                $prod['anket_3'],
                                $prod['anket_4'],
                                $prod['anket_5'],
                                $prod['anket_6'],
                                $prod['anket_8'],
                                $item['billing_full_name'],
                                $item['billing_postal_code'],
                                $item['billing_city'],
                                $item['billing_prefecture'],
                                $item['billing_street_address'],
                                $item['billing_building'],
                                $item['billing_phone'],
                                $item['billing_email'],
                                $item['shipping_full_name'],
                                $item['shipping_postal_code'],
                                $item['shipping_city'],
                                $item['shipping_prefecture'],
                                $item['shipping_street_address'],
                                $item['shipping_building'],
                                $item['shipping_phone'],
                                $item['shipping_email'],
                            ];
                            array_push($results, $result);
                        }
                    }
                }
            }
        }
        return $this->exportCsv($file_name, $csv_header, $results);
    }

    public function getDataOrder($orders)
    {
        $response = [];
        foreach ($orders as $order) {
            $order_item = [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'name' => $order->user->name,
                'user_email' => $order->user->email,
                'date_order' => formatDate($order->created_at),
                'billing_full_name' => $order->billing_full_name,
                'billing_postal_code' => $order->billing_postal_code,
                'billing_city' => $order->billing_city,
                'billing_prefecture' => $order->billing_prefecture,
                'billing_street_address' => $order->billing_street_address,
                'billing_building' => $order->billing_building,
                'billing_phone' => $order->billing_phone,
                'billing_email' => $order->billing_email,
                'shipping_full_name' => $order->shipping_full_name,
                'shipping_postal_code' => $order->shipping_postal_code,
                'shipping_city' => $order->shipping_city,
                'shipping_prefecture' => $order->shipping_prefecture,
                'shipping_street_address' => $order->shipping_street_address,
                'shipping_building' => $order->shipping_building,
                'shipping_phone' => $order->shipping_phone,
                'shipping_email' => $order->shipping_email,
                'order_products' => [],
            ];
            foreach ($order->products as $prod) {
                if ($prod->pivot->anket_6 == '11') {
                    $anket_6 = $prod->pivot->anket_7;
                } else {
                    $anket_6 = __(_CURRENTLY_TREATING[$prod->pivot->anket_6]);
                }
                $product_data = [
                    'id' => $prod->id,
                    'name' => $prod->name,
                    'quantity' => $prod->pivot->quantity,
                    'total' => $prod->pivot->quantity * $prod->price,
                    'anket_1' => __(GENDER[$prod->pivot->anket_1]),
                    'anket_2' => __(_YEAR_OLD[$prod->pivot->anket_2]),
                    'anket_3' => __(_YES_OR_NO[$prod->pivot->anket_3]),
                    'anket_4' => __(_YES_OR_NO[$prod->pivot->anket_4]),
                    'anket_5' => $prod->pivot->anket_5,
                    'anket_6' => $anket_6,
                    'anket_7' => $prod->pivot->anket_7,
                ];
                array_push($order_item['order_products'], $product_data);
            }
            array_push($response, $order_item);
        }

        return $response;
    }

    protected function exportCsv($file_name, $csv_header, $results){
        header('Content-Encoding: UTF-8');
        header("Content-Disposition: attachment; filename=\"$file_name\"");
        header("Content-Type: text/csv;charset=UTF-8");
        $af = fopen( 'php://output', 'w' );
        fprintf($af, chr(0xEF) . chr(0xBB) . chr(0xBF));
        fputcsv($af, $csv_header, ',', '"');
        foreach ($results as $item) {
            fputcsv($af, $item, ',', '"');
        }
        fclose($af);
        exit();
    }
}
