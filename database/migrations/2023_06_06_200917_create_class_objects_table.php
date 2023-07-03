<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClassObjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class_objects', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name');
            $table->json('attributes'); 
            $table->json('tipos_datos')->nullable(); 
            $table->json('long_datos')->nullable(); 
            $table->json('nullable_datos')->nullable(); 
            $table->json('methods')->nullable(); 
            $table->json('foreing_keys')->nullable(); 
            $table->json('foreing_keys_class')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('class_objects');
    }
}
