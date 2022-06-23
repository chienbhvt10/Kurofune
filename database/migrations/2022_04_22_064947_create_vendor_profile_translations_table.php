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
            $table->text('permit_classification')->nullable();
            $table->text('founder')->nullable();
            $table->text('items_stated_permit')->nullable();
            $table->text('management_pharmacist')->nullable();
            $table->text('pharmacist_working')->nullable();
            $table->text('registered_seller_working')->nullable();
            $table->text('drugs_handled')->nullable();
            $table->text('distinguishing_by_name')->nullable();
            $table->text('business_hours')->nullable();
            $table->text('consultation_hours')->nullable();
            $table->text('contact_information')->nullable();
            $table->text('currently_working')->nullable();
            $table->text('open_sale_time')->nullable();
            $table->text('time_order_outside')->nullable();
            $table->text('expiration_date_of_drugs')->nullable();
            $table->unique(['vendor_profile_id', 'locale']);
            $table->foreign('vendor_profile_id')->references('id')->on('vendor_profiles')->onDelete('cascade');
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
        Schema::dropIfExists('vendor_profile_translations');
    }
}
