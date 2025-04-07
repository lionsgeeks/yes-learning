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
        Schema::create('sub_workshops', function (Blueprint $table) {
            $table->id();
            $table->json("name");
            $table->json("description");
            $table->json("prerequisite");
            $table->foreignId("chapter_id")->constrained()->cascadeOnDelete();
            $table->foreignId("workshop_id")->constrained()->cascadeOnDelete();
            $table->date("date");
            $table->time("time");
            $table->integer("duration");
            $table->json("instructor");
            $table->json("meetLink");
            $table->boolean("allowQuestions");
            $table->boolean("requireRegistration");
            $table->boolean("sendNotifications");
            $table->boolean("published");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_workshops');
    }
};
