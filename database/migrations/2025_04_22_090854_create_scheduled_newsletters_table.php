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
        Schema::create('scheduled_newsletters', function (Blueprint $table) {
            $table->id();
            $table->json('subject');
            $table->json('content');
            $table->json('courses')->nullable();
            $table->enum('recipient_type', ['all', 'active', 'inactive', 'courses']);
            $table->timestamp('schedule_date');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scheduled_newsletters');
    }
};
