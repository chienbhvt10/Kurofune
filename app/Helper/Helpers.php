<?php
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
            $images['file_name'] = $value->file_name;
            $images['url'] = $value->getUrl();
        }
    }
    return $images;
}
