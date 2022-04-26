<?php

namespace Database\Factories;

use App\Enums\Base;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => 1,
            'dob' => $this->faker->date('Y-m-d', now()),
            'gender' => $this->faker->randomElement([Base::MALE, Base::FEMALE]),
            'facebook' => $this->faker->url(),
            'line' => $this->faker->url(),
            'address' => $this->faker->address(),
            'nationality' => $this->faker->text(10),
            'visa_type' => $this->faker->text(10),
            'job_name' => $this->faker->text(10),
            'company_representative' => $this->faker->text(10),
            'inflow_source' => $this->faker->text(10),
            'payment' => $this->faker->randomElement([Base::NO, Base::YES]),
            'insurance_status' => $this->faker->randomElement([1, 2, 3, 4, 5, 6]),
            'insurance_support' => $this->faker->text(10),
            'insurance_start_date' => $this->faker->text(10),
            'overseas_remittance_status' => $this->faker->randomElement([Base::UNREGISTERED, Base::REGISTERED]),
            'orientation' => $this->faker->text(10),
            'start_date_education' => $this->faker->dateTime(),
            'end_date_education' => $this->faker->dateTime(),
            'education_status' => $this->faker->randomElement([1,2,3,4,5,6,7,8]),
            'wabisabi_my_page_registration' => $this->faker->randomElement([Base::UNREGISTERED, Base::REGISTERED]),
        ];
    }
}
