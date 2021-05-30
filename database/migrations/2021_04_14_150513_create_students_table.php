<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('department_id');
            $table->foreignId('course_id');
            $table->string('phone')->unique();
            $table->string('gender')->unique();
            $table->string('dob')->unique();
            $table->bigInteger('address')->unique();
            $table->string('category');
            $table->string('religion');
            $table->string('father_name');
            $table->string('mother_name');
            $table->string('guardian');
            $table->string('nationality');
            $table->string('state');
            $table->longText('profile_picture')->nullable();
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
        Schema::dropIfExists('students');
    }
}
