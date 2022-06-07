<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrderProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('quantity');
            $table->tinyInteger('anket_1');
            $table->tinyInteger('anket_2');
            $table->tinyInteger('anket_3');
            $table->tinyInteger('anket_4');
            $table->string('anket_5')->nullable()->default(null);
            $table->tinyInteger('anket_6');
            $table->string('anket_7')->nullable()->default(null);
            $table->string('anket_8');
            $table->decimal('sub_total')->nullable()->default(0);
            $table->decimal('sub_total_tax')->nullable()->default(0);
            $table->decimal('total_tax')->nullable()->default(0);
            $table->decimal('total')->nullable()->default(0);
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->softDeletes();
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
        Schema::dropIfExists('order_product');
    }
}
