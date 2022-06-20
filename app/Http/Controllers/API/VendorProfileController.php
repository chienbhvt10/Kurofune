<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\VendorProfile;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Traits\CustomFilterTrait;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class VendorProfileController extends Controller
{
    use RespondsStatusTrait, CustomFilterTrait;
    public function index(): \Illuminate\Http\JsonResponse
    {
        $roleVendor = UserRole::ROLE_VENDOR;
        $userVendors = User::has('vendor_profile')->with('vendor_profile')
        ->where('active', '=', 1)
        ->whereHas('roles', function ($query) use ($roleVendor) {
            return $query->where('name', '=', $roleVendor);
        })
        ->get();
        if (empty($userVendors)) {
            return $this->response_error(__('message.user.vendor.not_data'), 404);
        }
        $vendors = [];
        foreach ($userVendors as $userVendor) {
            $images_outside = getMediaImages($userVendor->vendor_profile, 'images_outside');
            $images_inside = getMediaImages($userVendor->vendor_profile, 'images_inside');
            $items = [
                'id' => $userVendor->vendor_profile->id,
                'user_id' => $userVendor->vendor_profile->user_id,
                'name' => $userVendor->vendor_profile->name,
                'permit_classification' => $userVendor->vendor_profile->permit_classification,
                'founder' => $userVendor->vendor_profile->founder,
                'items_stated_permit' => $userVendor->vendor_profile->items_stated_permit,
                'management_pharmacist' => $userVendor->vendor_profile->management_pharmacist,
                'pharmacist_working' => $userVendor->vendor_profile->pharmacist_working,
                'registered_seller_working' => $userVendor->vendor_profile->registered_seller_working,
                'drugs_handled' => $userVendor->vendor_profile->drugs_handled,
                'distinguishing_by_name' => $userVendor->vendor_profile->distinguishing_by_name,
                'business_hours' => $userVendor->vendor_profile->business_hours,
                'consultation_hours' => $userVendor->vendor_profile->consultation_hours,
                'contact_information' => $userVendor->vendor_profile->contact_information,
                'currently_working' => $userVendor->vendor_profile->currently_working,
                'open_sale_time' => $userVendor->vendor_profile->open_sale_time,
                'time_order_outside' => $userVendor->vendor_profile->time_order_outside,
                'expiration_date_of_drugs' => $userVendor->vendor_profile->expiration_date_of_drugs,
                'images_outside' => $images_outside,
                'images_inside' => $images_inside,
            ];
            $vendors[] = $items;
        }

        return $this->response_data_success($vendors);
    }

    public function detailPharmacy($id)
    {
        $vendor = [];
        $vendor = VendorProfile::find($id);
        $images_outside = getMediaImages($vendor, 'images_outside');
        $images_inside = getMediaImages($vendor, 'images_inside');
        $items = [
            'id' => $vendor->id,
            'user_id' => $vendor->user_id,
            'name' => $vendor->name,
            'permit_classification' => $vendor->permit_classification,
            'founder' => $vendor->founder,
            'items_stated_permit' => $vendor->items_stated_permit,
            'management_pharmacist' => $vendor->management_pharmacist,
            'pharmacist_working' => $vendor->pharmacist_working,
            'registered_seller_working' => $vendor->registered_seller_working,
            'drugs_handled' => $vendor->drugs_handled,
            'distinguishing_by_name' => $vendor->distinguishing_by_name,
            'business_hours' => $vendor->business_hours,
            'consultation_hours' => $vendor->consultation_hours,
            'contact_information' => $vendor->contact_information,
            'currently_working' => $vendor->currently_working,
            'open_sale_time' => $vendor->open_sale_time,
            'time_order_outside' => $vendor->time_order_outside,
            'expiration_date_of_drugs' => $vendor->expiration_date_of_drugs,
            'images_outside' => $images_outside,
            'images_inside' => $images_inside,
        ];

        $vendor = $items;

        return $this->response_data_success($vendor);
    }

    public function productPharmacy($id)
    {
        $vendor = [];
        $vendor = VendorProfile::find($id);
        if (!empty($vendor)) {
            $products = $vendor->user->products()->get();
            foreach ($products as $prod) {
                $prod->categories;
            }
        } else {
            return $this->response_error(__('Not found data'), 404);
        }

        return $this->response_data_success($products);
    }

    public function searchPharmacy(Request $request){
        $search = $request->search;
        $posts_per_page = get_per_page($request->per_page);
        $lang = $request->header('X-localization');
        $validator = Validator::make($request->all(), [
            'search' => 'required',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return $this->response_validate($errors);
        }
        $name = Product::whereHas('product_translations',function($query) use ($search,$lang){
            return $query->where('name', 'LIKE','%'.$search.'%')->where('locale', '=', $lang);
        })
        ->paginate($posts_per_page);
        if ($name->isEmpty()) {
            return $this->response_error(__('message.product.not_exist'), Response::HTTP_NOT_FOUND);
        }
        return $this->response_data_success($name);
    }

}
