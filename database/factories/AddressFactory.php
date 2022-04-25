<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
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
            'postal_code' => $this->faker->postcode(),
            'city' => $this->faker->word(),
            'prefecture' => $this->faker->word(),
            'street_address' => $this->faker->word(),
            'building' => $this->faker->word(),
            'phone' => $this->faker->phoneNumber(),
        ];
    }
}
