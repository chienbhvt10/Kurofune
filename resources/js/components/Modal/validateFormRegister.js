export const validateFormRegister = {
    full_name: [{ required: true, message: "admins.user.error.name_required" }],
    email: [
        { required: true, message: "admins.user.error.email.required" },
        {
            pattern: new RegExp(
                /^([\w\-]|[^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\W]|(\.(?!(\.|@))))+@([\w-]+\.)+[\w-]{2,4}$/
            ),
            message: "admins.user.error.email.type",
        },
    ],
    birthday: [
        { required: true, message: "admins.user.error.birthday.required" },
    ],
    gender: [
        { required: true, message: "admins.user.error.gender.required" },
    ],
    phone_number: [
        {
            required: true,
            message: "admins.user.error.phone.required",
        },
        {
            pattern: new RegExp(/^[0-9]+$/),
            message: "admins.user.error.phone.pattern",
        },
    ],
    password: [
        {
            required: true,
            message: "admins.user.error.password.required",
        },
        {
            min: 8,
            message: "admins.user.error.password.min",
        },
        {
            pattern: new RegExp(/\d/),
            message: "admins.user.error.password.pattern_number",
        },
        {
            pattern: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/),
            message: "admins.user.error.password.pattern_special_characters",
        },
        {
            pattern: new RegExp(/^(?:(?=.*[a-z])(?=.*[A-Z]).*)$/),
            message: "admins.user.error.password.pattern_alpha",
        },
        {
            pattern: new RegExp(/^\S*$/u),
            message: "admins.user.error.password.pattern_space",
        },
    ],
    postcode: [
        { required: true, message: "admins.user.error.postcode_required"},
        {
            pattern: new RegExp(/〒?[0-9]{3}-?[0-9]{4}/),
            message: "admins.user.error.postal_code.pattern",
        },
    ],
    prefecture: [
        { required: true, message: "admins.user.error.prefecture_required" },
    ],
    town_city: [{ required: true, message: "admins.user.error.city_required" }],
    street_address: [
        { required: true, message: "admins.user.error.street_address_required" },
    ],
    language:[
        { required: true, message: "admins.user.error.language_required" }
    ],
    nationality:[
        { required: true, message: "admins.user.error.nationality_required" }
    ],
    visa_type:[
        { required: true, message: "admins.user.error.visa_type_required" }
    ],
    course:[
        { required: true, message: "admins.user.error.course_required" }
    ],
    job:[
        { required: true, message: "admins.user.error.job_required" }
    ]

};