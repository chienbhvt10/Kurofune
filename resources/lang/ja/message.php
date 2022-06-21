<?php

return [
    'user' => [
        'logout' => 'ログアウトができました。',
        'created' => 'ユーザを作成しました。',
        'updated' => 'ユーザーを更新しました。',
        'deleted' => 'ユーザーを削除しました。',
        'not_exist' => 'ユーザが存在しません。',
        'vendor' => [
            'not_data' => '薬局リストが空です。'
        ],
        'inactive' => 'ユーザーが非アクティブ',
        'unauthenticated' => '認証されていません。',
        'active' => 'ユーザーが既にアクティブになっています。'
    ],
    'role' => [
        'created' => 'ロールを作成しました。',
        'updated' => 'ロールを更新しました。',
        'deleted' => 'ロールを削除しました。',
    ],
    'permission' => [
        'created' => '権限を作成しました。',
        'updated' => '権限を更新しました。',
        'deleted' => '権限を消除しました。',
    ],
    'tax' => [
        'created' => 'ページを作成しました。',
        'update' => 'ページを更新しました。',
        'delete' => 'ページを削除しました。'
    ],
    'import_user' => [
        'success' => 'データーユーザーを出力しました。',
    ],
    'billing' => [
        'updated' => '請求先住所が正常に変更されました。',
    ],
    'shipping' => [
        'updated' => '配送先住所が正常に変更されました。',
    ],
    'address' => [
        'updated' => 'ユーザー情報の登録内容を変更しました。',
    ],
    'postal_code' => [
        'valid' => '有効な郵便番号を入力してください。',
    ],
    'page'=>[
        'created' =>'ページを正常に作成',
        'updated' =>'ページを正常に更新します',
        'deleted' =>'ページを正常に削除',
        'not_exist' =>'ページが存在しません',
    ],
    'password' => [
        'updated' => 'パスワードは正常に変更されました。',
        'without_spaces' => 'パスワードにスペースを含んではいけません。',
        'reset_link_sent' => 'パスワード再発行メールが送信されました。<br>ご登録メールアドレスをご確認ください。',
    ],
    'category' => [
        'created' => 'カテゴリーを作成しました。',
        'updated' => 'カテゴリーを更新しました。',
        'deleted' => 'カテゴリーを消除しました。',
        'not_exist' => 'カテゴリーが存在しません。',
    ],
    'slug' => [
        'unique' => 'スラッグはすでに撮影済みです。',
    ],
    'medicine' => [
        'not_found' => '薬が見つかりません。',
    ],
    'product' => [
        'created' => '商品を作成しました。',
        'updated' => '商品を更新しました。',
        'deleted' => '商品を消除しました。',
        'not_exist' => '商品が存在しません。',
    ],
    'shipping_method' => [
        'created' => '配送方法を正常に作成する',
        'updated' => '配送方法を正常に更新',
        'deleted' => '配送方法を正常に削除します',
        'not_exist' => '配送方法がありません'
    ],
    'cart' => [
        'add' => ':product_name が買い物かごに追加されました。',
        'no_info' => '買い物かご内の情報はありません。',
        'deleted' => 'Cart deleted',
        'updated' => 'Cart updated',
        'quantity' => '購入内容をご確認ください。'
    ],
    'order' => [
        'no_info' => '注文なし',
        'deleted' => 'Order deleted',
        'updated' => 'Order updated',
    ]
];
