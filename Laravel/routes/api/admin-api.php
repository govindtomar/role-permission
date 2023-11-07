 <?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\Backend\UserController;
use App\Http\Controllers\API\Backend\LoanStatusController;
use App\Http\Controllers\API\Backend\LoanTypeController;
use App\Http\Controllers\API\Backend\LoanApplicationController;

Route::prefix('user')->name('user.')->group(function () {
	Route::get('/', [UserController::class, 'index'])->name('index');
	Route::get('/all', [UserController::class, 'indexAll'])->name('index.all');
	Route::post('/', [UserController::class, 'store'])->name('store');
	Route::put('/', [UserController::class, 'update'])->name('update');
	Route::delete('/{id}', [UserController::class, 'destroy'])->name('delete');
	Route::get('/{id}', [UserController::class, 'show'])->name('show');
	Route::post('/status', [UserController::class, 'status'])->name('status');
});


Route::prefix('loan-status')->name('loan-status.')->group(function () {
	Route::get('/', [LoanStatusController::class, 'index'])->name('index');
	Route::get('/all', [LoanStatusController::class, 'indexAll'])->name('index.all');
	Route::post('/', [LoanStatusController::class, 'store'])->name('store');
	Route::put('/', [LoanStatusController::class, 'update'])->name('update');
	Route::delete('/{id}', [LoanStatusController::class, 'destroy'])->name('delete');
	Route::get('/{id}', [LoanStatusController::class, 'show'])->name('show');
	Route::post('/status', [LoanStatusController::class, 'status'])->name('status');
});



Route::prefix('loan-type')->name('loan-type.')->group(function () {
	Route::get('/', [LoanTypeController::class, 'index'])->name('index');
	Route::get('/all', [LoanTypeController::class, 'indexAll'])->name('index.all');
	Route::post('/', [LoanTypeController::class, 'store'])->name('store');
	Route::put('/', [LoanTypeController::class, 'update'])->name('update');
	Route::delete('/{id}', [LoanTypeController::class, 'destroy'])->name('delete');
	Route::get('/{id}', [LoanTypeController::class, 'show'])->name('show');
	Route::post('/status', [LoanTypeController::class, 'status'])->name('status');
});



Route::prefix('loan-application')->name('loan-application.')->group(function () {
	Route::get('/', [LoanApplicationController::class, 'index'])->name('index');
	Route::get('/all', [LoanApplicationController::class, 'indexAll'])->name('index.all');
	Route::post('/', [LoanApplicationController::class, 'store'])->name('store');
	Route::put('/', [LoanApplicationController::class, 'update'])->name('update');
	Route::delete('/{id}', [LoanApplicationController::class, 'destroy'])->name('delete');
	Route::get('/{id}', [LoanApplicationController::class, 'show'])->name('show');
	Route::post('/status', [LoanApplicationController::class, 'status'])->name('status');
});