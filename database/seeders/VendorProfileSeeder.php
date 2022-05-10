<?php

namespace Database\Seeders;

use App\Models\VendorProfile;
use Illuminate\Database\Seeder;

class VendorProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'user_id' => 4,
            'en' => [
                'name' => 'Marine Pharmacy Oisotori',
                'permit_classification'  => '',
                'founder'  => '',
                'items_stated_permit'  => '',
                'management_pharmacist'  => '',
                'pharmacist_working'  => '',
                'registered_seller_working'  => '',
                'drugs_handled'  => '',
                'distinguishing_by_name'  => '',
                'business_hours'  => '',
                'consultation_hours'  => '',
                'contact_information'  => '',
                'currently_working'  => '',
                'open_sale_time'  => '',
                'time_order_outside'  => '',
                'expiration_date_of_drugs'  => '',
            ],
            'ja' => [
                'name' => 'マリン薬局　大磯通店',
                'permit_classification'  => '',
                'founder'  => '',
                'items_stated_permit'  => '',
                'management_pharmacist'  => '',
                'pharmacist_working'  => '',
                'registered_seller_working'  => '',
                'drugs_handled'  => '',
                'distinguishing_by_name'  => '',
                'business_hours'  => '',
                'consultation_hours'  => '',
                'contact_information'  => '',
                'currently_working'  => '',
                'open_sale_time'  => '',
                'time_order_outside'  => '',
                'expiration_date_of_drugs'  => '',
            ],
            'vi' => [
                'name' => 'Hiệu thuốc Marine Oisotori',
                'permit_classification'  => '',
                'founder'  => '',
                'items_stated_permit'  => '',
                'management_pharmacist'  => '',
                'pharmacist_working'  => '',
                'registered_seller_working'  => '',
                'drugs_handled'  => '',
                'distinguishing_by_name'  => '',
                'business_hours'  => '',
                'consultation_hours'  => '',
                'contact_information'  => '',
                'currently_working'  => '',
                'open_sale_time'  => '',
                'time_order_outside'  => '',
                'expiration_date_of_drugs'  => '',
            ],
            'tl' => [
                'name' => 'Marine Pharmacy Oisotori',
                'permit_classification'  => '',
                'founder'  => '',
                'items_stated_permit'  => '',
                'management_pharmacist'  => '',
                'pharmacist_working'  => '',
                'registered_seller_working'  => '',
                'drugs_handled'  => '',
                'distinguishing_by_name'  => '',
                'business_hours'  => '',
                'consultation_hours'  => '',
                'contact_information'  => '',
                'currently_working'  => '',
                'open_sale_time'  => '',
                'time_order_outside'  => '',
                'expiration_date_of_drugs'  => '',
            ],
            'zh' => [
                'name' => '海洋药房大矶',
                'permit_classification'  => '',
                'founder'  => '',
                'items_stated_permit'  => '',
                'management_pharmacist'  => '',
                'pharmacist_working'  => '',
                'registered_seller_working'  => '',
                'drugs_handled'  => '',
                'distinguishing_by_name'  => '',
                'business_hours'  => '',
                'consultation_hours'  => '',
                'contact_information'  => '',
                'currently_working'  => '',
                'open_sale_time'  => '',
                'time_order_outside'  => '',
                'expiration_date_of_drugs'  => '',
            ],
        ];
        $vendor = VendorProfile::create($data);
        $vendor->addMediaFromUrl("https://pharma.its-globaltek.com/wp-content/uploads/2022/01/marineooiso_gaikan_1-1.jpeg")
            ->toMediaCollection('images_outside');
        $vendor->addMediaFromUrl("https://pharma.its-globaltek.com/wp-content/uploads/2022/01/marineooiso_naikan_1-1.jpeg")
            ->toMediaCollection('images_inside');
        $vendor->addMediaFromUrl("https://pharma.its-globaltek.com/wp-content/uploads/2022/01/marineooiso_naikan_2-1.jpeg")
            ->toMediaCollection('images_inside');
    }
}
