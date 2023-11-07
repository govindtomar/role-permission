<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('api')->nullable();
            $table->string('url')->nullable();  
            $table->string('route_name')->nullable();
            $table->string('method')->nullable();            
            $table->unsignedBigInteger('permission_module_id');
            $table->foreign('permission_module_id')->references('id')->on('permission_modules');
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('permission_routes');
    }
};
