<?php

namespace App\Traits;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

trait ProductTrait
{
    protected function getTax($id){
        $tax = Tax::find($id);
        if($tax) {
            return number_format($tax->value).'%';
        }
        return null;
    }

    protected function get_price_html($price) {
        return number_format($price)." ". __('(JPY)');
    }

    protected function get_price_including_tax(Product $product){
        $tax_id = $product->tax_id;
        if($tax_id){
            $value_tax = Tax::find($tax_id)->value ?? null;
            return $product->price + $product->price*$value_tax/100;
        }
        return (float)$product->price;
    }

    public function get_order_number($id)
    {
        return 'OP-' . str_pad($id, 8, "0", STR_PAD_LEFT);
    }

    public function resetCart(Cart $cart){
        $cart->delete();
    }

    /**
     * get slug for product
     *
     * @param   string  $nameProduct
     *
     * @return  string  slug
     */
    public function getSlug($nameProduct)
    {
        $slug = Str::slug($nameProduct);

        if (!check_unique_slug(new Product, $slug)) {
            $max = Product::withTrashed()->withoutGlobalScopes()
            ->whereHas('product_translations', function (Builder $query) use ($nameProduct) {
                $query->where('name', '=', $nameProduct)
                ->where('locale', '=', 'en');
            })->latest('id')->value('slug');

            if (!empty($max) && is_numeric($max[-1])) {
                return preg_replace_callback('/(\d+)$/', function ($mathces) {
                    return $mathces[1] + 1;
                }, $max);
            }

            return "{$slug}-2";
        }

        return $slug;
    }
}
