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

    'accepted' => ':attributeを承認してください。',
    'accepted_if' => ':otherが:valueの場合、:attributeを受け入れる必要があります。',
    'active_url' => ':attributeは、有効なURLではありません。',
    'after' => ':attributeには、:dateより後の日付を指定してください。',
    'after_or_equal' => ':attributeには、:date以降の日付を指定してください。',
    'alpha' => ':attributeには、アルファベッドのみ使用できます。',
    'alpha_dash' => ':attributeには、英数字(\'A-Z\',\'a-z\',\'0-9\')とハイフンと下線(\'-\',\'_\')が使用できます。',
    'alpha_num' => ':attributeには、英数字(\'A-Z\',\'a-z\',\'0-9\')が使用できます。',
    'array' => ':attributeには、配列を指定してください。',
    'before' => ':attributeには、:dateより前の日付を指定してください。',
    'before_or_equal' => ':attributeには、:date以前の日付を指定してください。',
    'between' => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file' => ':attributeには、:min KBから:max KBまでのサイズのファイルを指定してください。',
        'string' => ':attributeには、:minから、:maxまでの数字を指定してください。',
        'array' => ':attributeの項目は、:min個から:max個にしてください。',
    ],
    'boolean' => ':attributeには、\'true\'か\'false\'を指定してください。',
    'confirmed' => ':attributeと:attribute確認が一致しません。',
    'current_password' => 'パスワードが正しくありません。',
    'date' => ':attributeは、正しい日付ではありません。',
    'date_equals' => ':attributeは:dateに等しい日付でなければなりません。',
    'date_format' => ':attributeの形式は、\':format\'と合いません。',
    'declined' => ':attributeは 辞退する必要があります。',
    'declined_if' => ':otherが:valueの場合、:attributeは拒否されなければならない',
    'different' => ':attributeと:otherには、異なるものを指定してください。',
    'digits' => ':attributeは、:digits桁にしてください。',
    'digits_between' => ':attributeは、:min桁から:max桁にしてください。',
    'dimensions' => ':attributeの画像サイズが無効です',
    'distinct' => ':attributeの値が重複しています。',
    'email' => 'メールは有効なメールアドレスではありません。',
    'ends_with' => ':attributeは、次のうちのいずれかで終わらなければなりません。: :values',
    'enum' => '選択した :attributeは 無効です。',
    'exists' => '選択された:attributeは、有効ではありません。',
    'file' => ':attributeはファイルでなければいけません。',
    'filled' => ':attributeは必須です。',
    'gt' => [
        'array' => ':attributeの項目数は、:value個より大きくなければなりません。',
        'file'=> ':attributeは、:value KBより大きくなければなりません。',
        'numeric' => ':attributeは、:valueより大きくなければなりません。',
        'string'  => ':attributeは、:value文字より大きくなければなりません。',
    ],
    'gte' => [
        'array' => ':attributeの項目数は、:value個以上でなければなりません。',
        'file' => ':attributeは、:value KB以上でなければなりません。',
        'numeric' => ':attributeは、:value以上でなければなりません。',
        'string'  => ':attributeは、:value文字以上でなければなりません。',
    ],
    'image' => ':attributeには、画像を指定してください。',
    'in' => '選択された:attributeは、有効ではありません。',
    'in_array' => ':attributeが:otherに存在しません。',
    'integer' => ':attributeには、整数を指定してください。',
    'ip' => ':attributeには、有効なIPアドレスを指定してください。',
    'ipv4' => ':attributeはIPv4アドレスを指定してください。',
    'ipv6' => ':attributeはIPv6アドレスを指定してください。',
    'json' => ':attributeには、有効なJSON文字列を指定してください。',
    'lt' => [
        'array' => ':attributeの項目数は、:value個より小さくなければなりません。',
        'file' => ':attributeは、:value KBより小さくなければなりません。',
        'numeric' => ':attributeは、:valueより小さくなければなりません。',
        'string' => ':attributeは、:value文字より小さくなければなりません。',
    ],
    'lte'=> [
        'array' => ':attributeの項目数は、:value個以下でなければなりません。',
        'file'    => ':attributeは、:value KB以下でなければなりません。',
        'numeric' => ':attributeは、:value以下でなければなりません。',
        'string'  => ':attributeは、:value文字以下でなければなりません。',
    ],
    'mac_address' => ':attributeは有効なMACアドレスである必要があります。',
    'max' => [
        'array' => ':attributeの項目は、:max個以下にしてください。',
        'file' => ':attributeには、:max KB以下のファイルを指定してください。',
        'numeric' => ':attributeには、:max以下の数字を指定してください。',
        'string'  => ':attributeは、:max文字以下にしてください。',
    ],
    'mimes'=> ':attributeには、:valuesタイプのファイルを指定してください。',
    'mimetypes' => ':attributeには、:valuesタイプのファイルを指定してください。',
    'min'=> [
        'array' => ':attributeの項目は、:min個以上にしてください。',
        'file' => ':attributeには、:min KB以上のファイルを指定してください。',
        'numeric' => ':attributeには、:min以上の数字を指定してください。',
        'string'  => ':attributeは、:min文字以上にしてください。',
    ],
    'multiple_of' => ':attributeは:valueの倍数でなければなりません',
    'not_in' => '選択された:attributeは、有効ではありません。',
    'not_regex' => ':attributeの形式が無効です。',
    'numeric' => ':attribute 番号は数字を入力してください。',
    'password' => 'パスワードが正しくありません。',
    'present' => ':attributeが存在している必要があります。',
    'prohibited' => ':attributeフィールドは禁止されています。',
    'prohibited_if' => ':attributeフィールドは、:otherが:valueの場合は禁止されています。',
    'prohibited_unless' => ':attributeフィールドは、:otherが:valuesでない限り禁止されています。',
    'prohibits' => ':attribute フィールドは、:other が存在することを禁止します。',
    'regex' => ':attributeには、有効な正規表現を指定してください。',
    'required'=> ':attribute を入力してください。',
    'required_array_keys' => ':attributeフィールドには、：valuesのエントリを含める必要があります。',
    'required_if'  => ':otherが:valueの場合、:attributeを指定してください。',
    'required_unless' => ':otherが:values以外の場合、:attributeを指定してください。',
    'required_with' => ':valuesが指定されている場合、:attributeも指定してください。',
    'required_with_all' => ':valuesが全て指定されている場合、:attributeも指定してください。',
    'required_without' => ':valuesが指定されていない場合、:attributeを指定してください。',
    'required_without_all' => ':valuesが全て指定されていない場合、:attributeを指定してください。',
    'same' => ':attributeと:otherが一致しません。',
    'size' => [
        'array' => ':attributeの項目は、:size個にしてください。',
        'file' => ':attributeには、:size KBのファイルを指定してください。',
        'numeric' => ':attributeには、:sizeを指定してください。',
        'string' => ':attributeは、:size文字にしてください。',
    ],
    'starts_with' => ':attributeは、次のいずれかで始まる必要があります。:values',
    'string'  => ':attributeには、文字を指定してください。',
    'timezone' => ':attributeには、有効なタイムゾーンを指定してください。',
    'unique' => '指定の:attributeは既に使用されています。',
    'uploaded' => ':attributeのアップロードに失敗しました。',
    'url' => ':attributeは、有効なURL形式で指定してください。',
    'uuid' => ':attributeは、有効なUUIDでなければなりません。',
    'zipcode' => '有効な郵便番号をご入力ください。',
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
            'current_password' => '現在のパスワードが正しくありません。'
        ],
        'password' => [
            'different' => '新しいパスワードを現在のパスワードと同じにすることはできません',
            'regex' => 'パスワードが形式と一致しません',
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
        'full_name' => '氏名',
        'postal_code' => '郵便番号',
        'city' => '市区町村',
        'prefecture' => '都道府県',
        'street_address' => '丁目・番地・号',
        'building' => '建物名・部屋番号',
        'phone' => '電話番号',
        'email' => 'メールアドレス',
        'active' => 'アクティブステータス',
        'password' => 'パスワード',
        'role' => 'ユーザーの役割',
        'en' => 'en データ',
        'ja' => 'ja データ',
        'tl' => 'tl データ',
        'vi' => 'vi データ',
        'zh' => 'zh データ',
        'file_upload' => 'ファイルのアップロード',
        'en.name' => '名前',
        'shipping_address.full_name' => '氏名',
        'shipping_address.postal_code' => '郵便番号',
        'shipping_address.city' => '市区町村',
        'shipping_address.prefecture' => '都道府県',
        'shipping_address.street_address' => '丁目・番地・号',
        'shipping_address.building' => '建物名・部屋番号',
        'shipping_address.phone' => '電話番号',
        'billing_address.full_name' => '氏名',
        'billing_address.postal_code' => '郵便番号',
        'billing_address.city' => '市区町村',
        'billing_address.prefecture' => '都道府県',
        'billing_address.street_address' => '丁目・番地・号',
        'billing_address.building' => '建物名・部屋番号',
        'billing_address.phone' => '電話番号',
    ],

];
