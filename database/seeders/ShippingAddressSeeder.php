<?php

namespace Database\Seeders;

use App\Models\ShippingAddress;
use Illuminate\Database\Seeder;

class ShippingAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ShippingAddress::factory()->count(5)->create();
    }
}
