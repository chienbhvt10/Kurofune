<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PostalCode implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);

        $data = [
            "codes" => $value,
            'country' => 'JP'
        ];

        curl_setopt($ch, CURLOPT_URL, "https://app.zipcodebase.com/api/v1/search?" . http_build_query($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "apikey: cfdd15a0-8fc8-11ec-be6d-7ddcc654de1d",
        ));

        $response = curl_exec($ch);
        curl_close($ch);

        $result = json_decode($response);

        if (empty($result->results)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __('message.postal_code.valid');
    }
}
