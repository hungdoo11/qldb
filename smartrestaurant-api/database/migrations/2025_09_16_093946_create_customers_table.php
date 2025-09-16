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
        Schema::create('customers', function (Blueprint $table) {
           $table->id(); 
            $table->string('name', 100);
            $table->string('phone', 20)->unique()->nullable();
            $table->string('email', 100)->unique()->nullable();
            $table->integer('points')->default(0);
            $table->enum('type', ['walk-in', 'member'])->default('walk-in');
            $table->string('note', 255)->nullable();
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
