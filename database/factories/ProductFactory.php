<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => 4,
            'slug' => $this->faker->slug,
            'sku' => 'sku-'.$this->faker->randomNumber(),
            'stock_status' => $this->faker->randomElement(['instock', 'outofstock']),
            'price' => 12000,
            'status' => $this->faker->randomElement(['publish', 'draft']),
            'product_image' => $this->faker->imageUrl,
            'tax_id' => null,
            'meta_title' => $this->faker->text(50),
            'meta_description' => $this->faker->text(100),
            'meta_keywords' => $this->faker->randomElement(['pharmacy', 'medicine', 'panadol']),
            'en' => [
                'name' => $this->faker->text(100),
                'medicinal_efficacy_classification' => $this->faker->text(100),
                'features' => $this->faker->text(100),
                'precautions' => $this->faker->text(100),
                'efficacy_effect' => $this->faker->text(100),
                'usage_dose' => $this->faker->text(100),
                'active_ingredients' => $this->faker->text(100),
                'additives' => $this->faker->text(100),
                'precautions_storage_handling' => $this->faker->text(100),
                'manufacturer' => $this->faker->text(100),
            ],
            'ja' => [
                'name' => $this->faker->text(100),
                'medicinal_efficacy_classification' => $this->faker->text(100),
                'features' => $this->faker->text(100),
                'precautions' => $this->faker->text(100),
                'efficacy_effect' => $this->faker->text(100),
                'usage_dose' => $this->faker->text(100),
                'active_ingredients' => $this->faker->text(100),
                'additives' => $this->faker->text(100),
                'precautions_storage_handling' => $this->faker->text(100),
                'manufacturer' => $this->faker->text(100),
            ],
            'vi' => [
                'name' => $this->faker->text(100),
                'medicinal_efficacy_classification' => $this->faker->text(100),
                'features' => $this->faker->text(100),
                'precautions' => $this->faker->text(100),
                'efficacy_effect' => $this->faker->text(100),
                'usage_dose' => $this->faker->text(100),
                'active_ingredients' => $this->faker->text(100),
                'additives' => $this->faker->text(100),
                'precautions_storage_handling' => $this->faker->text(100),
                'manufacturer' => $this->faker->text(100),
            ],
            'tl' => [
                'name' => $this->faker->text(100),
                'medicinal_efficacy_classification' => $this->faker->text(100),
                'features' => $this->faker->text(100),
                'precautions' => $this->faker->text(100),
                'efficacy_effect' => $this->faker->text(100),
                'usage_dose' => $this->faker->text(100),
                'active_ingredients' => $this->faker->text(100),
                'additives' => $this->faker->text(100),
                'precautions_storage_handling' => $this->faker->text(100),
                'manufacturer' => $this->faker->text(100),
            ],
            'zh' => [
                'name' => $this->faker->text(100),
                'medicinal_efficacy_classification' => $this->faker->text(100),
                'features' => $this->faker->text(100),
                'precautions' => $this->faker->text(100),
                'efficacy_effect' => $this->faker->text(100),
                'usage_dose' => $this->faker->text(100),
                'active_ingredients' => $this->faker->text(100),
                'additives' => $this->faker->text(100),
                'precautions_storage_handling' => $this->faker->text(100),
                'manufacturer' => $this->faker->text(100),
            ],
        ];
    }
}
