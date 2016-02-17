<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIndices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->index(['user_id', 'subbreddit_id']);
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->index(['user_id', 'post_id', 'comment_id']);
        });

        Schema::table('subbreddits', function (Blueprint $table) {
            $table->index('user_id');
        });

        Schema::table('subbreddit_user', function (Blueprint $table) {
            $table->index(['user_id', 'subbreddit_id']);
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
            // $table->dropIndex('posts_user_id_index');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropIndex('comments_user_id_post_id_comment_id_index');
        });

        Schema::table('subbreddits', function (Blueprint $table) {
            $table->dropIndex('subbreddits_user_id_index');
        });

        Schema::table('subbreddit_user', function (Blueprint $table) {
            $table->dropIndex('subbreddit_user_user_id_subbreddit_id_index');
        });
    }
}
