<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SitemapController;

Route::group(['middleware' => 'jwt.verify'], function ($router) {

});

// Route::get('/sitemap', [SitemapController::class, 'index'])->name('sitemap');




