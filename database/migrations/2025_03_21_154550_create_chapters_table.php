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
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->integer('estimated_duration'); 
            $table->boolean('published')->default(false);
            $table->boolean('enable_discussion')->default(true);
            $table->boolean('enable_certificate')->default(false);
            $table->json('content'); 
            $table->foreignId('course_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate(); 
            // $table->foreignId('quizz_id')->nullable()->constrained('quizzes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};
