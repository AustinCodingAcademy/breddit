<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeContentColumnNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->renameColumn('content', 'post_content');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->renameColumn('content', 'comment_content');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            Schema::table('posts', function (Blueprint $table) {
                $table->renameColumn('post_content', 'content');
            });

            Schema::table('comments', function (Blueprint $table) {
                $table->renameColumn('comment_content', 'content');
            });
        });
    }
}
