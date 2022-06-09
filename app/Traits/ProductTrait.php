<?php

namespace App\Traits;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Tax;
use Illuminate\Http\Response;

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
}
