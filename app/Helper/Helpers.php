<?php

use App\Enums\Base;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

function generate_uuid(): string
{
    return (string) Str::uuid();
}

if (!function_exists('formatDate')) {
    function formatDate($date, string $format = 'Y/m/d')
    {
        if ($date instanceof \Carbon\Carbon) {
            return $date->format($format);
        }

        return $date;
    }
}

if (!function_exists('checkPostalCode')) {
    function checkPostalCode($param)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, false);

        $data = [
            "codes" => $param,
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
}


function getMediaImages(\App\Models\VendorProfile $vendor_profile, $key): array
{
    $images = [];
    if($vendor_profile->hasMedia($key)) {
        $get_vendor_images2 = $vendor_profile->getMedia($key);
        foreach ($get_vendor_images2 as $value) {
            $item['file_name'] = $value->file_name;
            $item['url'] = $value->getUrl();
            $images[] = $item;
        }
    }
    return $images;
}

function upload_avatar($file_avatar = null): string
{
    $filename = "default.png";
    if($file_avatar) {
        $filename= date('YmdHi').$file_avatar->getClientOriginalName();
        $file_avatar->move(public_path('avatars'), $filename);
    }
    return "avatars/".$filename;
}

function get_avatar_url($avatar = null) {
    return $avatar ? url($avatar) : url(Base::PATH_AVATAR_DEFAULT);
}

function upload_single_image($image, $path = null): string
{
    if (!is_dir(public_path('images_data/' . $path))) {
        File::makeDirectory('images_data/' . $path, 0775, true);
    }
    $path = $path ? $path.'/' : null;
    $image_name = date('YmdHis').'-'.$image->getClientOriginalName();
    $image->move(public_path('images_data/' . $path), $image_name);
    return 'images_data/' . $path . $image_name;
}

function get_image_url($image = null) {
    return $image ? url($image) : url(Base::PATH_IMG_DEFAULT);
}
