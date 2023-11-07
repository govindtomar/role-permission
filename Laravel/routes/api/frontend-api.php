<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Frontend\LoanController;
use App\Http\Controllers\SitemapController;

// Route::group(['middleware' => 'jwt.verify'], function ($router) {

// });

// Route::get('/sitemap', [SitemapController::class, 'index'])->name('sitemap');

// Route::prefix('product')->name('product.')->group(function () {
// 	Route::get('/', [ProductController::class, 'index'])->name('index');
// 	Route::get('/{id}', [ProductController::class, 'show'])->name('show');
// });


Route::get('/loan-type', [LoanController::class, 'loanType'])->name('loan-type');

Route::post('/loan-apply', [LoanController::class, 'loanApply'])->name('loan-apply');


