<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\VendorProfile;
use App\Traits\RespondsStatusTrait;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Traits\CustomFilterTrait;

class VendorProfileController extends Controller
{
    use RespondsStatusTrait, CustomFilterTrait;
    public function index(): \Illuminate\Http\JsonResponse
    {
        $ids_vendor = VendorProfile::pluck('id')->toArray();
        if(empty($ids_vendor)) {
            return $this->errorResponse(__('message.user.vendor.not_data'), 404);
        }else{
            $vendors = [];
            foreach ($ids_vendor as $id){
                $vendor = VendorProfile::find($id);
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
                    'images_outside' => $vendor->images_outside,
                    'images_inside' => $vendor->images_inside,
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
            'images_outside' => $vendor->images_outside,
            'images_inside' => $vendor->images_inside,
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
        $posts_per_page = config('constants.pagination.items_per_page');
        $lang = $request->header('X-localization');
        if($search != ""){
            $name = Product::with(['translations' => function($query) use($search,$lang) {
                return $query->where('name','LIKE',"%$search%")->where('locale','=',$lang);
            }])
            ->paginate($posts_per_page);
        }else{
            $name = Product::with(['translations' => function($query) use($lang) {
                return $query->where('locale','=',$lang);
            }])
            ->paginate($posts_per_page);
        }
        return $this->responseData($name);
    }
}
