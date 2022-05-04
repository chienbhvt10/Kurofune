<?php

namespace Database\Factories;
use App\Enums\Base;
use Illuminate\Support\Str;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'author_id' => User::all(['id'])->random(),
            'slug' => Str::random(10),
            'status' => $this->faker->randomElement([Base::PAGE_PUBLISH_STATUS , Base::PAGE_DRAFT_STATUS]),
            'image' => $this->faker->word(),
            'meta_title' => $this->faker->word(),
            'meta_description' => $this->faker->word(),
            'meta_keywords'=> $this->faker->word(),
        ];
    }
}
