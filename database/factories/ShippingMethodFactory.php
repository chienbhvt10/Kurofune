<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ShippingMethodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
                'name' => $this->faker->word(),
                'total' => $this->faker->numerify(),
                'description' => $this->faker->word(),
                'logo' => $this->faker->image('public/images_data',640,480, null, false),
        ];
    }
}
