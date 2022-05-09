<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('slug')->unique()->nullable()->default(null);
            $table->string('sku', 100)->unique()->nullable();
            $table->enum('stock_status', ['instock', 'outofstock'])->default('instock');
            $table->decimal('price', 13, 2)->nullable()->default(0);
            $table->enum('status', ['publish', 'draft'])->default('draft');
            $table->string('product_image')->nullable();
            $table->unsignedBigInteger('tax_id')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->foreign('tax_id')->references('id')->on('taxes');
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
        Schema::dropIfExists('products');
    }
}
