<?php

return array(
    'pagination' => array(
        'items_per_page' => env('ITEMS_PER_PAGE', 10)
    ),
    'product' => [
        'max_length_of_slug' => 190,
        'max_length_ramdom_slug' => 10
    ]
);
