<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFulltextToArtists extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE artists ADD FULLTEXT INDEX full_text_name(name)');
        DB::statement('ALTER TABLE artists ADD FULLTEXT INDEX full_text(name, description)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('ALTER TABLE artists DROP INDEX full_text');
        DB::statement('ALTER TABLE artists DROP INDEX full_text_name');
    }
}
