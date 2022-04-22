<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

class BillingAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => User::all(['id'])->random(),
            'full_name' => $this->faker->name(),
            'postal_code' => $this->faker->randomNumber(7, true),
            'city' => $this->faker->word(),
            'prefecture' => $this->faker->word(),
            'street_address' => $this->faker->word(),
            'building' => $this->faker->word(),
            'phone' => $this->faker->randomNumber(10, true),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }
}
