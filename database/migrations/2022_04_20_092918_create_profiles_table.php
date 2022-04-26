<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('dob')->nullable();
            $table->tinyInteger('gender')->nullable()->comment('0: Male 1: Female');
            $table->string('phone', 50)->nullable();
            $table->string('facebook')->nullable();
            $table->string('line')->nullable();
            $table->string('address', 255)->nullable();
            $table->string('nationality', 255)->nullable();
            $table->string('visa_type', 100)->nullable();
            $table->string('job_name', 150)->nullable();
            $table->string('company_representative', 150)->nullable();
            $table->string('inflow_source', 100)->nullable();
            $table->tinyInteger('payment')->nullable()->comment('0: No 1: Yes');
            $table->tinyInteger('insurance_status')->nullable();
            $table->string('insurance_support', 150)->nullable();
            $table->string('insurance_start_date')->nullable();
            $table->tinyInteger('overseas_remittance_status', [])->nullable()->comment('0: Unregistered 1: Registered');
            $table->string('orientation', 100)->nullable();
            $table->date('start_date_education')->nullable();
            $table->date('end_date_education')->nullable();
            $table->tinyInteger('education_status')->nullable()->comment('1: N1, 2: N2, 3: N3, 4: N4, 5: N5, 6: N0, 7: unregistered
, 8: under erasure');
            $table->tinyInteger('wabisabi_my_page_registration')->nullable()->comment('0: Unregistered, 1: Registered');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('profiles');
    }
}
