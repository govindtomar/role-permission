<?php

use Illuminate\Support\Facades\Route;


 // Post Controller Routes 
use App\Http\Controllers\API\Backend\PostController;
	Route::resource('post', PostController::class);
	Route::post('post/status', [PostController::class, 'status'])->name('post.status');
	Route::post('post/publish', [PostController::class, 'publish'])->name('post.publish');
