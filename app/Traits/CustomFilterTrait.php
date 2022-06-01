<?php

namespace App\Traits;

use Illuminate\Support\Facades\Lang;
trait CustomFilterTrait
{
    public function filterWhereHasName($model, $relational, $request, $paginate)
    {
        $lang = Lang::locale();
        $results = $model->whereHas($relational, function ($query) use ($request, $lang) {
            $query->where('name', 'LIKE', '%' . $request . '%')
                ->where('locale', $lang);
        })->paginate($paginate);

        return $results;
    }

    public function filterScopeName($model, $request)
    {
        $results = $model->where('name', 'LIKE', '%' . $request . '%');

        return $results;
    }
}
