<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtistIntroductionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('artist_articles')) {
            Schema::create('artist_articles', function (Blueprint $table) {
                $table->increments('id');

                $table->boolean('active')->default(false);
                $table->string('prefix');
                $table->string('slug');

                $table->string('title');
                $table->text('description')->nullable();
                $table->text('content');

                $table->integer('user_id')->unsigned()->nullable();
                $table->integer('artist_id')->unsigned();

                $table->softDeletes();
                $table->timestamps();

                $table->foreign('user_id')
                    ->references('id')
                    ->on('users')
                    ->onDelete('set null');

                $table->foreign('artist_id')
                    ->references('id')
                    ->on('artists')
                    ->onDelete('cascade');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('artist_articles');
    }
}
