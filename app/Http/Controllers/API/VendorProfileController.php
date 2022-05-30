<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VendorProfile;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use App\Models\Product;

class VendorProfileController extends Controller
{
    use RespondsStatusTrait;
    public function index(): \Illuminate\Http\JsonResponse
    {
        $ids_vendor = VendorProfile::pluck('id')->toArray();
        if(empty($ids_vendor)) {
            return $this->errorResponse(__('message.user.vendor.not_data'), 404);
        }else{
            $vendors = [];
            foreach ($ids_vendor as $id){
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
                $vendors[] = $items;
            }
            return $this->responseData($vendors);
        }
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

        return $this->responseData($vendor);
    }

    public function productPharmacy($id)
    {
        $vendor = [];
        $vendor = VendorProfile::find($id);
        if (!empty($vendor)) {
            $products = $vendor->user->products()->get();
        } else {
            return $this->errorResponse(__('Not found data'));
        }

        return $this->responseData($products);
    }

    public function searchPharmacy(Request $request){
        $search = $request->search;
        $posts = Product::whereHas('product_translations', function ($query) use ($search) {
            $query->where('name', 'LIKE', "%$search%");
        })->get();
        return $this->responseData($posts);
    }
}
