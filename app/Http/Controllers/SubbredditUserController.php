<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class SubbredditUserController extends Controller
{
    // Subscribe to a subreddit
    public function store(Request $request) {
    	\Auth::user()->subscribedSubbreddits()->attach($request->subbreddit_id);
    	return $request->subbreddit_id;
    }

}
