<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorProfileTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_profile_translations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_profile_id');
            $table->string('locale')->index();
            $table->string('name')->nullable();
            $table->string('permit_classification')->nullable();
            $table->string('founder')->nullable();
            $table->string('items_stated_permit')->nullable();
            $table->string('management_pharmacist')->nullable();
            $table->string('pharmacist_working')->nullable();
            $table->string('registered_seller_working')->nullable();
            $table->string('drugs_handled')->nullable();
            $table->string('distinguishing_by_name')->nullable();
            $table->string('business_hours')->nullable();
            $table->string('consultation_hours')->nullable();
            $table->string('contact_information')->nullable();
            $table->string('currently_working')->nullable();
            $table->string('open_sale_time')->nullable();
            $table->string('time_order_outside')->nullable();
            $table->string('expiration_date_of_drugs')->nullable();
            $table->unique(['vendor_profile_id', 'locale']);
            $table->foreign('vendor_profile_id')->references('id')->on('vendor_profiles')->onDelete('cascade');
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
        Schema::dropIfExists('vendor_profile_translations');
    }
}
