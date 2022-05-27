<?php

namespace App\Traits;

trait CustomFilterTrait
{
    public function filterWhereHasName($model, $relational, $request, $paginate)
    {
        $results = $model->whereHas($relational, function ($query) use ($request) {
            $query->where('name', 'like', '%' . $request . '%');
        })->paginate($paginate);

        return $results;
    }

    public function filterScopeName($model, $request)
    {
        $results = $model->where('name', 'LIKE', '%' . $request . '%');

        return $results;
    }
}
