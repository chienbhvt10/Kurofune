<?php

namespace App\Traits;

trait CustomFilterTrait
{
    public function filterWhereHasName($model, $relational, $request, $paginate, $lang)
    {
        $results = $model->whereHas($relational, function ($query) use ($request, $lang) {
            $query->where('name', 'LIKE', '%' . $request . '%')
                ->where('locale', $lang);
        })->paginate($paginate);

        return $results;
    }

    public function filterScopeName($model, $request, $lang)
    {
        $results = $model->where('name', 'LIKE', '%' . $request . '%')
                        ->where('locale', $lang);

        return $results;
    }
}
