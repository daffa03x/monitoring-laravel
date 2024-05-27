<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vehicle_id');
            $table->unsignedBigInteger('driver_id');
            $table->unsignedBigInteger('admin_id');
            $table->unsignedBigInteger('approver_id');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->enum('status', ['pending', 'approved', 'rejected']);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('vehicle_id')->references('id')->on('vehicles');
            $table->foreign('driver_id')->references('id')->on('drivers');
            $table->foreign('admin_id')->references('id')->on('users');
            $table->foreign('approver_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
