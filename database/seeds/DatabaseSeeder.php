<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 1000)->create()->each(function($user) {
            $user->subbreddits()->save(factory(App\Subbreddit::class)->make());

            $user->posts()->save(factory(App\Post::class)->make([
                'subbreddit_id' => rand(1,App\Subbreddit::all()->count())
            ]));

            $user->comments()->save(factory(App\Comment::class)->make([
                'post_id' => rand(1,App\Post::all()->count())
            ]));

            $user->comments()->save(factory(App\Comment::class)->make([
                'comment_id' => rand(1,App\Comment::all()->count())
            ]));

            $user->subscribedSubbreddits()->attach(rand(1,App\Subbreddit::all()->count()));
        });
    }
}
