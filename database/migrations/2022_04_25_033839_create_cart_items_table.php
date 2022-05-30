<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->string('id');
            $table->primary('id');
            $table->string('cart_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedInteger('quantity');
            $table->tinyInteger('anket_1');
            $table->tinyInteger('anket_2');
            $table->tinyInteger('anket_3');
            $table->tinyInteger('anket_4');
            $table->string('anket_5');
            $table->tinyInteger('anket_6');
            $table->string('anket_7');
            $table->foreign('cart_id')->references('id')->on('carts')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_items');
    }
}
