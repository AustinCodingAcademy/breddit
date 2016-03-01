<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
     /**
     * Get the user that owns the post.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

     /**
     * Get the subbreddit that owns the post.
     */
    public function subbreddit()
    {
        return $this->belongsTo('App\Subbreddit');
    }

     /**
     * Get the comments of the subbreddit.
     */
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
