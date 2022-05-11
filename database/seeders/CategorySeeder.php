<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'user_id' => 1,
            'parent_id' => 0,
            'slug' => 'category_seed',
            'type' => '1',
            'category_image' => 'https://via.placeholder.com/640x360',
            'en' => [
                'name' => 'Category en',
            ],
            'ja' => [
                'name' => 'Category ja',
            ],
            'vi' => [
                'name' => 'Category vi',
            ],
            'tl' => [
                'name' => 'Category tl',
            ],
            'zh' => [
                'name' => 'Category zh',
            ]
        ];

        Category::create($data);
    }
}
