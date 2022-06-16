<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('vendor_profile_id');
            $table->unsignedBigInteger('shipping_method_id')->nullable();
//            $table->decimal('total')->nullable()->default(0);
//            $table->decimal('total_tax')->nullable()->default(0);
            $table->string('shipping_full_name')->nullable();
            $table->string('shipping_postal_code')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_prefecture')->nullable();
            $table->string('shipping_street_address')->nullable();
            $table->string('shipping_building')->nullable();
            $table->string('shipping_phone')->nullable();
            $table->string('shipping_email')->nullable();
            $table->string('billing_full_name')->nullable();
            $table->string('billing_postal_code')->nullable();
            $table->string('billing_city')->nullable();
            $table->string('billing_prefecture')->nullable();
            $table->string('billing_street_address')->nullable();
            $table->string('billing_building')->nullable();
            $table->string('billing_phone')->nullable();
            $table->string('billing_email')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('vendor_profile_id')->references('id')->on('vendor_profiles')->onDelete('cascade');
            $table->foreign('shipping_method_id')->references('id')->on('shipping_methods');
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
        Schema::dropIfExists('orders');
    }
}
