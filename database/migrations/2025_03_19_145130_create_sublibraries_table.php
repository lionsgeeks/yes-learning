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
        Schema::create('sublibraries', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('link')->nullable();
            $table->string('language');
            $table->string('coach');
            $table->foreignId('library_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sublibraries');
    }
};
