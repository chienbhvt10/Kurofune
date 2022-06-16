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

    'accepted'=> 'Trường :attribute phải được chấp nhận.',
    'accepted_if'=> 'Trường :attribute phải được chấp nhận khi :other là :value.',
    'active_url' => 'Trường :attribute không phải là một URL hợp lệ.',
    'after'=> 'Trường :attribute phải là một ngày sau ngày :date.',
    'after_or_equal'=> 'Trường :attribute phải là thời gian bắt đầu sau hoặc đúng bằng :date.',
    'alpha'  => 'Trường :attribute chỉ có thể chứa các chữ cái.',
    'alpha_dash'  => 'Trường :attribute chỉ có thể chứa chữ cái, số và dấu gạch ngang.',
    'alpha_num' => 'Trường :attribute chỉ có thể chứa chữ cái và số.',
    'array' => 'Trường :attribute phải là dạng mảng.',
    'before'  => 'Trường :attribute phải là một ngày trước ngày :date.',
    'before_or_equal' => 'Trường :attribute phải là thời gian bắt đầu trước hoặc đúng bằng :date.',
    'between'  => [
        'array' => 'Trường :attribute phải có từ :min - :max phần tử.',
        'file'  => 'Dung lượng tập tin trong trường :attribute phải từ :min - :max kB.',
        'numeric'=> 'Trường :attribute phải nằm trong khoảng :min - :max.',
        'string' => 'Trường :attribute phải từ :min - :max kí tự.',
    ],
    'boolean' => 'Trường :attribute phải là true hoặc false.',
    'confirmed' => 'Giá trị xác nhận trong trường :attribute không khớp.',
    'current_password' => 'Mật khẩu không đúng.',
    'date' => 'Trường :attribute không phải là định dạng của ngày-tháng.',
    'date_equals' => 'Trường :attribute phải là một ngày bằng với :date.',
    'date_format' => 'Trường :attribute không giống với định dạng :format.',
    'declined' => 'Trường :attribute phải bị từ chối.',
    'declined_if'  => 'Trường :attribute phải bị từ chối khi :other là :value.',
    'different'  => 'Trường :attribute và :other phải khác nhau.',
    'digits'  => 'Độ dài của trường :attribute phải gồm :digits chữ số.',
    'digits_between' => 'Độ dài của trường :attribute phải nằm trong khoảng :min and :max chữ số.',
    'dimensions' => 'Trường :attribute có kích thước không hợp lệ.',
    'distinct'=> 'Trường :attribute có giá trị trùng lặp.',
    'email' => 'Địa chỉ email không hợp lệ.',
    'ends_with' => 'Trường :attribute phải kết thúc bằng một trong những giá trị sau: :values',
    'enum' => 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'exists'=> 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'file'=> 'Trường :attribute phải là một tệp tin.',
    'filled' => 'Trường :attribute không được bỏ trống.',
    'gt' => [
        'array' => 'Mảng :attribute phải có nhiều hơn :value phần tử.',
        'file' => 'Dung lượng trường :attribute phải lớn hơn :value kilobytes.',
        'numeric' => 'Giá trị trường :attribute phải lớn hơn :value.',
        'string' => 'Độ dài trường :attribute phải nhiều hơn :value kí tự.',
    ],
    'gte' => [
        'array' => 'Mảng :attribute phải có ít nhất :value phần tử.',
        'file' => 'Dung lượng trường :attribute phải lớn hơn hoặc bằng :value kilobytes.',
        'numeric' => 'Giá trị trường :attribute phải lớn hơn hoặc bằng :value.',
        'string' => 'Độ dài trường :attribute phải lớn hơn hoặc bằng :value kí tự.',
    ],
    'image'=> 'Trường :attribute phải là định dạng hình ảnh.',
    'in' => 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'in_array' => 'Trường :attribute phải thuộc tập cho phép: :other.',
    'integer' => 'Trường :attribute phải là một số nguyên.',
    'ip' => 'Trường :attribute phải là một địa chỉ IP.',
    'ipv4' => 'Trường :attribute phải là một địa chỉ IPv4.',
    'ipv6' => 'Trường :attribute phải là một địa chỉ IPv6.',
    'json' => 'Trường :attribute phải là một chuỗi JSON.',
    'lt' => [
        'array' => 'Mảng :attribute phải có ít hơn :value phần tử.',
        'file'=> 'Dung lượng trường :attribute phải nhỏ hơn :value kilobytes.',
        'numeric' => 'Giá trị trường :attribute phải nhỏ hơn :value.',
        'string' => 'Độ dài trường :attribute phải nhỏ hơn :value kí tự.',
    ],
    'lte' => [
        'array' => 'Mảng :attribute không được có nhiều hơn :value phần tử.',
        'file' => 'Dung lượng trường :attribute phải nhỏ hơn hoặc bằng :value kilobytes.',
        'numeric' => 'Giá trị trường :attribute phải nhỏ hơn hoặc bằng :value.',
        'string' => 'Độ dài trường :attribute phải nhỏ hơn hoặc bằng :value kí tự.',
    ],
    'mac_address' => 'Trường :attribute phải là một địa chỉ MAC hợp lệ.',
    'max' => [
        'array' => 'Trường :attribute không được lớn hơn :max phần tử.',
        'file' => 'Dung lượng tập tin trong trường :attribute không được lớn hơn :max kB.',
        'numeric' => 'Trường :attribute không được lớn hơn :max.',
        'string'  => 'Trường :attribute không được lớn hơn :max kí tự.',
    ],
    'mimes' => 'Trường :attribute phải là một tập tin có định dạng: :values.',
    'mimetypes' => 'Trường :attribute phải là một tập tin có định dạng: :values.',
    'min' => [
        'array' => 'Trường :attribute phải có tối thiểu :min phần tử.',
        'file' => 'Dung lượng tập tin trong trường :attribute phải tối thiểu :min kB.',
        'numeric' => 'Trường :attribute phải tối thiểu là :min.',
        'string' => 'Trường :attribute phải có tối thiểu :min kí tự.',
    ],
    'multiple_of' => 'Trường :attribute phải là bội số của :value',
    'not_in' => 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'not_regex' => 'Trường :attribute có định dạng không hợp lệ.',
    'numeric'=> ':attribute là chữ số.',
    'password' => 'Mật khẩu không đúng.',
    'present' => 'Trường :attribute phải được cung cấp.',
    'prohibited' => 'Trường :attribute bị cấm.',
    'prohibited_if' => 'Trường :attribute bị cấm khi :other là :value.',
    'prohibited_unless' => 'Trường :attribute bị cấm trừ khi :other là một trong :values.',
    'prohibits' => 'Trường :attribute cấm :other từ thời điểm hiện tại.',
    'regex' => 'Trường :attribute có định dạng không hợp lệ.',
    'required' => 'Vui lòng nhập :attribute',
    'required_array_keys' => 'Trường :attribute phải bao gồm các mục nhập cho: :values.',
    'required_if' => 'Trường :attribute không được bỏ trống khi trường :other là :value.',
    'required_unless' => 'Trường :attribute không được bỏ trống trừ khi :other là :values.',
    'required_with' => 'Trường :attribute không được bỏ trống khi một trong :values có giá trị.',
    'required_with_all' => 'Trường :attribute không được bỏ trống khi tất cả :values có giá trị.',
    'required_without' => 'Trường :attribute không được bỏ trống khi một trong :values không có giá trị.',
    'required_without_all' => 'Trường :attribute không được bỏ trống khi tất cả :values không có giá trị.',
    'same' => 'Trường :attribute và :other phải giống nhau.',
    'size' => [
        'array' => 'Trường :attribute phải chứa :size phần tử.',
        'file' => 'Dung lượng tập tin trong trường :attribute phải bằng :size kB.',
        'numeric' => 'Trường :attribute phải bằng :size.',
        'string' => 'Trường :attribute phải chứa :size kí tự.',
    ],
    'starts_with' => 'Trường :attribute phải được bắt đầu bằng một trong những giá trị sau: :values',
    'string' => 'Trường :attribute phải là một chuỗi kí tự.',
    'timezone' => 'Trường :attribute phải là một múi giờ hợp lệ.',
    'unique' => 'Trường :attribute đã có trong cơ sở dữ liệu.',
    'uploaded' => 'Trường :attribute tải lên thất bại.',
    'url' => 'Trường :attribute không giống với định dạng một URL.',
    'uuid' => 'Trường :attribute phải là một chuỗi UUID hợp lệ.',
    'zipcode' => 'Vui lòng nhập zip code hợp lệ',
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
            'current_password' => 'Mật khẩu hiện tại của bạn không chính xác.'
        ],
        'password' => [
            'different' => 'Mật khẩu mới không được giống với mật khẩu hiện tại',
            'regex' => 'Mật khẩu của bạn không phù hợp với định dạng',
            'min' => 'The :attribute must be at least :min characters.'
        ],
        'anket_1' => [
            'required' => 'Mục này là mục bắt buộc.'
        ],
        'anket_2' => [
            'required' => 'Mục này là mục bắt buộc.'
        ],
        'anket_3' => [
            'required' => 'Mục này là mục bắt buộc.'
        ],
        'anket_4' => [
            'required' => 'Mục này là mục bắt buộc.'
        ],
        'anket_5' => [
            'required' => 'Mục này là mục bắt buộc.'
        ],
        'anket_6' => [
            'required' => 'Mục này là mục bắt buộc.'
        ],
        'anket_7' => [
            'required' => 'Mục này là mục bắt buộc.'
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
        'full_name' => 'Họ và Tên',
        'postal_code' => 'Mã bưu điện/ ZIP code',
        'city' => 'Thị trấn / Thành phố',
        'prefecture' => 'Tỉnh/ Thành phố',
        'street_address' => 'Địa chỉ khu phố',
        'building' => 'Tên tòa nhà',
        'phone' => 'Số điện thoại',
        'email' => 'Địa chỉ email',
        'active' => 'Trạng thái hoạt động',
        'password' => 'Mật khẩu',
        'role' => 'Vai trò người dùng',
        'file_upload' => 'Tiệp tải lên',
        'en.name' => 'Tên',
        'shipping_address.full_name' => 'Họ và Tên',
        'shipping_address.postal_code' => 'Mã bưu điện/ ZIP code',
        'shipping_address.city' => 'Thị trấn / Thành phố',
        'shipping_address.prefecture' => 'Tỉnh/ Thành phố',
        'shipping_address.street_address' => 'Địa chỉ khu phố',
        'shipping_address.building' => 'Tên toà nhà',
        'shipping_address.phone' => 'Số điện thoại',
        'billing_address.full_name' => 'Họ và Tên',
        'billing_address.postal_code' => 'Mã bưu điện/ ZIP code',
        'billing_address.city' => 'Thị trấn / Thành phố',
        'billing_address.prefecture' => 'Tỉnh/ Thành phố',
        'billing_address.street_address' => 'Địa chỉ khu phố',
        'billing_address.building' => 'Tên toà nhà',
        'billing_address.phone' => 'Số điện thoại',
        'username' => 'Tên tài khoản',
    ],

];
