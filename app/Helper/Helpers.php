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
        File::makeDirectory(public_path('images_data/' . $path), 0775, true);
    }
    $path = $path ? $path.'/' : null;
    $image_name = date('YmdHis').'-'.$image->getClientOriginalName();
    $image->move(public_path('images_data/' . $path), $image_name);
    return 'images_data/' . $path . $image_name;
}

function get_image_url($image = null) {
    return $image ? url($image) : url(Base::PATH_IMG_DEFAULT);
}

function save_base_64_image($image, $path = null)
{
    if (!File::isDirectory(public_path('images_data/' . $path))) {
        File::makeDirectory(public_path('images_data/' . $path), 0775, true);
    }
    $path = $path ? $path . '/' : null;
    $folder_path = public_path('images_data/' . $path);
    $image_parts = explode(';base64,', $image);
    $image_type_aux = explode('image/', $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $file_name = date('YmdHis') . '-' . uniqid() . '.' . $image_type;
    $file_path = $folder_path . $file_name;
    file_put_contents($file_path, $image_base64);
    return 'images_data/' . $path . $file_name;
}

function save_multiple_image($arr_image = [], $path = null)
{
    $multiple_images = [];
    if ($arr_image) {
        foreach ($arr_image as $img) {
            $image_path = save_base_64_image($img, $path);
            array_push($multiple_images, $image_path);
        }
    }
    return json_encode($multiple_images);
}

function get_multiple_image($arr_image)
{
    $results = [];
    $multiple_images = json_decode($arr_image);
    if ($multiple_images) {
        foreach ($multiple_images as $img) {
            $image_path = get_image_url($img);
            array_push($results, $image_path);
        }
    }

    return $results;
}

function check_unique_slug($model, $slug)
{
    $slug_check = $model->where('slug', $slug)->first();
    if (!empty($slug_check->slug) && ($slug_check->slug === $slug)) {
        return false;
    }
    return true;
}

function check_unique_slug_update($model, $slug, $id)
{
    $slug_check = $model->where('slug', $slug)->first();
    if (!empty($slug_check->slug) && ($slug_check->slug === $slug) && ($slug_check->id != $id)) {
        return false;
    }
    return true;
}

function get_per_page($number) {
    if(isset($number) && (int)$number && $number !== 0){
        return (int)$number;
    }
    return config('constants.pagination.items_per_page');
}

function get_price_html($price): string
{
    return number_format($price)." ". __('(JPY)');
}
