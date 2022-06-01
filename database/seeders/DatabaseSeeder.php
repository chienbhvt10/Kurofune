<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PermissionSeeder::class,
            UserAdminSeeder::class,
//            ShippingMethodSeeder::class,
//            PageSeeder::class,
//            VendorProfileSeeder::class,
//            UserSeeder::class,
//            ProfileSeeder::class,
//            BillingAddressSeeder::class,
//            ShippingAddressSeeder::class,
//            AddressSeeder::class,
//            TaxSeeder::class,
//            CategorySeeder::class,
//            ProductSeeder::class
        ]);
    }
}
