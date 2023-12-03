 <?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\UserController;

Route::prefix('user')->name('user.')->group(function () {
	Route::get('/', [UserController::class, 'index'])->name('index');
	Route::get('/all', [UserController::class, 'indexAll'])->name('index.all');
	Route::post('/', [UserController::class, 'store'])->name('create');
	Route::put('/', [UserController::class, 'update'])->name('update');
	Route::delete('/{id}', [UserController::class, 'destroy'])->name('delete');
	Route::get('/{id}', [UserController::class, 'show'])->name('show');
	Route::post('/status', [UserController::class, 'status'])->name('status');
});
