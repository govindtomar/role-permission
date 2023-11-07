<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\UserController;
use App\Http\Controllers\V1\ServiceController;
use App\Http\Controllers\V1\ContactMeController;
use App\Http\Controllers\V1\LoanTypeController;

Route::group(['middleware' => 'jwt.verify'], function ($router) {
	Route::get('/dashboard', [UserController::class, 'index'])->name('dashboard');

	Route::prefix('user')->name('user.')->group(function () {
		Route::get('/', [UserController::class, 'index'])->name('index');
		Route::post('/', [UserController::class, 'store'])->name('create');
		Route::put('/', [UserController::class, 'update'])->name('update');
		Route::delete('/{id}', [UserController::class, 'delete'])->name('delete');
		Route::post('/status', [UserController::class, 'changeStatus'])->name('status');
		Route::get('/{id}', [UserController::class, 'show'])->name('show');
	});

	Route::prefix('service')->name('service.')->group(function () {
		Route::get('/', [ServiceController::class, 'index'])->name('index');
		Route::post('/', [ServiceController::class, 'store'])->name('create');
		Route::put('/', [ServiceController::class, 'update'])->name('update');
		Route::delete('/{id}', [ServiceController::class, 'delete'])->name('delete');
		Route::post('/status', [ServiceController::class, 'status'])->name('status');
		Route::get('/{id}', [ServiceController::class, 'show'])->name('show');
	});

	Route::prefix('contact-me')->name('contact-me.')->group(function () {
		Route::get('/', [ContactMeController::class, 'index'])->name('index');
		Route::post('/', [ContactMeController::class, 'store'])->name('create');
		Route::put('/', [ContactMeController::class, 'update'])->name('update');
		Route::delete('/{id}', [ContactMeController::class, 'destroy'])->name('delete');
		Route::get('/{id}', [ContactMeController::class, 'show'])->name('show');
	});

	Route::prefix('loan-type')->name('loan-type.')->group(function () {
		Route::get('/', [LoanTypeController::class, 'index'])->name('index');
		Route::post('/', [LoanTypeController::class, 'store'])->name('create');
		Route::put('/', [LoanTypeController::class, 'update'])->name('update');
		Route::delete('/{id}', [LoanTypeController::class, 'destroy'])->name('delete');
		Route::get('/{id}', [LoanTypeController::class, 'show'])->name('show');
		Route::post('/status', [LoanTypeController::class, 'status'])->name('status');
		Route::post('/loan-new/{id}/required', [LoanTypeController::class, 'status'])->name('loan-new_reqiored');
	});

	Route::prefix('loan-applicant')->name('loan-applicant.')->group(function () {
		Route::get('/', [LoanApplicantController::class, 'index'])->name('index');
		Route::post('/', [LoanApplicantController::class, 'store'])->name('create');
		Route::put('/', [LoanApplicantController::class, 'update'])->name('update');
		Route::delete('/{id}', [LoanApplicantController::class, 'destroy'])->name('delete');
		Route::get('/{id}', [LoanApplicantController::class, 'show'])->name('show');
		Route::post('/status', [LoanApplicantController::class, 'status'])->name('status');
	});

});


Route::prefix('loan-type')->name('loan-type.')->group(function () {
	Route::get('/', [LoanTypeController::class, 'index'])->name('index');
});
