<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->string('locale');
            $table->unique(['product_id', 'locale']);
            $table->string('name', 255)->nullable();
            $table->string('medicinal_efficacy_classification')->nullable();
            $table->string('features')->nullable();
            $table->string('precautions')->nullable();
            $table->string('efficacy_effect')->nullable();
            $table->string('usage_dose')->nullable();
            $table->string('active_ingredients')->nullable();
            $table->string('additives')->nullable();
            $table->string('precautions_storage_handling')->nullable();
            $table->string('manufacturer')->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
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
        Schema::dropIfExists('product_translations');
    }
}
