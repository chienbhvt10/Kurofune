<?php

namespace Database\Seeders;

use App\Models\BillingAddress;
use Illuminate\Database\Seeder;

class BillingAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BillingAddress::factory()->count(5)->create();
    }
}
