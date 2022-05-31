<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted' => '必須接受 :attribute。',
    'accepted_if' => '當 :other 為 :value 時，:attribute 必須接受。',
    'active_url'  => ':attribute 不是有效的網址。',
    'after' => ':attribute 必須要晚於 :date。',
    'after_or_equal' => ':attribute 必須要等於 :date 或更晚。',
    'alpha' => ':attribute 只能以字母組成。',
    'alpha_dash'  => ':attribute 只能以字母、數字、連接線(-)及底線(_)組成。',
    'alpha_num' => ':attribute 只能以字母及數字組成。',
    'array' => ':attribute 必須為陣列。',
    'before' => ':attribute 必須要早於 :date。',
    'before_or_equal' => ':attribute 必須要等於 :date 或更早。',
    'between' => [
        'array' => ':attribute: 必須有 :min - :max 個元素。',
        'file' => ':attribute 必須介於 :min 至 :max KB 之間。 ',
        'numeric' => ':attribute 必須介於 :min 至 :max 之間。',
        'string' => ':attribute 必須介於 :min 至 :max 個字元之間。',
    ],
    'boolean' => ':attribute 必須為布林值。',
    'confirmed' => ':attribute 確認欄位的輸入不一致。',
    'current_password' => '當前密碼不正確。',
    'date' => ':attribute 不是有效的日期。',
    'date_equals' => ':attribute 必須等於 :date。',
    'date_format' => ':attribute 不符合 :format 的格式。',
    'declined' => ':attribute 必須拒絕。',
    'declined_if' => '當 :other 為 :value 時，:attribute 必須拒絕。',
    'different' => ':attribute 與 :other 必須不同。',
    'digits' => ':attribute 必須是 :digits 位數字。',
    'digits_between' => ':attribute 必須介於 :min 至 :max 位數字。',
    'dimensions' => ':attribute 圖片尺寸不正確。',
    'distinct' => ':attribute 已經存在。',
    'email' => '电子邮件不是有效的电子邮件地址。',
    'ends_with' => ':attribute 結尾必須包含下列之一：:values。',
    'enum' => ':attribute 的值不正確。',
    'exists' => ':attribute 不存在。',
    'file' => ':attribute 必須是有效的檔案。',
    'filled' => ':attribute 不能留空。',
    'gt' => [
        'array' => ':attribute 必須多於 :value 個元素。',
        'file' => ':attribute 必須大於 :value KB。',
        'numeric' => ':attribute 必須大於 :value。',
        'string' => ':attribute 必須多於 :value 個字元。',
    ],
    'gte' => [
        'array' => ':attribute 必須多於或等於 :value 個元素。',
        'file' => ':attribute 必須大於或等於 :value KB。',
        'numeric' => ':attribute 必須大於或等於 :value。',
        'string' => ':attribute 必須多於或等於 :value 個字元。',
    ],
    'image' => ':attribute 必須是一張圖片。',
    'in' => '所選擇的 :attribute 選項無效。',
    'in_array' => ':attribute 沒有在 :other 中。',
    'integer' => ':attribute 必須是一個整數。',
    'ip' => ':attribute 必須是一個有效的 IP 位址。',
    'ipv4' => ':attribute 必須是一個有效的 IPv4 位址。',
    'ipv6' => ':attribute 必須是一個有效的 IPv6 位址。',
    'json' => ':attribute 必須是正確的 JSON 字串。',
    'lt' => [
        'array' => ':attribute 必須少於 :value 個元素。',
        'file' => ':attribute 必須小於 :value KB。',
        'numeric' => ':attribute 必須小於 :value。',
        'string' => ':attribute 必須少於 :value 個字元。',
    ],
    'lte' => [
        'array' => ':attribute 必須少於或等於 :value 個元素。',
        'file' => ':attribute 必須小於或等於 :value KB。',
        'numeric' => ':attribute 必須小於或等於 :value。',
        'string' => ':attribute 必須少於或等於 :value 個字元。',
    ],
    'mac_address' => ':attribute 必須是一個有效的 MAC 位址。',
    'max' => [
        'array' => ':attribute 最多有 :max 個元素。',
        'file' => ':attribute 不能大於 :max KB。',
        'numeric' => ':attribute 不能大於 :max。',
        'string' => ':attribute 不能多於 :max 個字元。',
    ],
    'mimes' => ':attribute 必須為 :values 的檔案。',
    'mimetypes' => ':attribute 必須為 :values 的檔案。',
    'min' => [
        'array' => ':attribute 至少有 :min 個元素。',
        'file' => ':attribute 不能小於 :min KB。',
        'numeric' => ':attribute 不能小於 :min。',
        'string' => ':attribute 不能小於 :min 個字元。',
    ],
    'multiple_of' => '所選擇的 :attribute 必須為 :value 中的多個。',
    'not_in' => '所選擇的 :attribute 選項無效。',
    'not_regex' => ':attribute 的格式錯誤。',
    'numeric'  => ':attribute 号码必须是数字。',
    'password' => '密碼錯誤',
    'present' => ':attribute 必須存在。',
    'prohibited' => ':attribute 字段被禁止。',
    'prohibited_if' => '当 :other 为 :value 时，:attribute字段被禁止。',
    'prohibited_unless' => ':attribute 字段被禁止，除非 :other 在 :values 中。',
    'prohibits' => ':attribute 字段禁止包含 :other。',
    'regex'=> ':attribute 的格式錯誤。',
    'required' => ':attribute 不能留空。',
    'required_array_keys' => ':attribute 必須包含 :values 中的一個鍵。',
    'required_if' => '當 :other 是 :value 時 :attribute 不能留空。',
    'required_unless' => '當 :other 不是 :values 時 :attribute 不能留空。',
    'required_with'  => '當 :values 出現時 :attribute 不能留空。',
    'required_with_all' => '當 :values 出現時 :attribute 不能為空。',
    'required_without' => '當 :values 留空時 :attribute field 不能留空。',
    'required_without_all' => '當 :values 都不出現時 :attribute 不能留空。',
    'same' => ':attribute 與 :other 必須相同。',
    'size' => [
        'array' => ':attribute 必須是 :size 個元素。',
        'file' => ':attribute 的大小必須是 :size KB。',
        'numeric' => ':attribute 的大小必須是 :size。',
        'string' => ':attribute 必須是 :size 個字元。',
    ],
    'starts_with' => ':attribute 開頭必須包含下列之一：:values。',
    'string' => ':attribute 必須是一個字串。',
    'timezone' => ':attribute 必須是一個正確的時區值。',
    'unique' => ':attribute 已經存在。',
    'uploaded' => ':attribute 上傳失敗。',
    'url' => ':attribute 的格式錯誤。',
    'uuid' => ':attribute 必須是有效的 UUID。',
    'zipcode' => '请给我一个有效的邮政编码',
    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
        'current_password' => [
            'current_password' => '您当前的密码不正确。'
        ],
        'password' => [
            'different' => '新密码不能与当前密码相同',
            'regex' => '您的密码与格式不符',
            'min' => 'The :attribute must be at least :min characters.'
        ]
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [
        'full_name' => '全名',
        'postal_code' => '邮政编码',
        'city' => '城镇/城市',
        'prefecture' => '州',
        'street_address' => '街道地址',
        'building' => '建造',
        'phone' => '电话',
        'email' => '电子邮件地址',
        'active' => '活動狀態',
        'password' => '密碼',
        'role' =>'用戶角色',
        'en' => 'en 數據',
        'ja' => 'ja 數據',
        'tl' => 'tl 數據',
        'vi' => 'vi 數據',
        'zh' => 'zh 數據',
        'file_upload' => '上传文件',
        'en.name' => '姓名',
        'shipping_address.full_name' => '全名',
        'shipping_address.postal_code' => '邮政编码',
        'shipping_address.city' => '城镇/城市',
        'shipping_address.prefecture' => '州',
        'shipping_address.street_address' => '街道地址',
        'shipping_address.building' => '建造',
        'shipping_address.phone' => '电话',
        'billing_address.full_name' => '全名',
        'billing_address.postal_code' => '邮政编码',
        'billing_address.city' => '城镇/城市',
        'billing_address.prefecture' => '州',
        'billing_address.street_address' => '街道地址',
        'billing_address.building' => '建造',
        'billing_address.phone' => '电话',
    ],

];
