<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\Backend\RolePermission\RoleController;
use App\Http\Controllers\API\Backend\RolePermission\PermissionModuleController;
use App\Http\Controllers\API\Backend\RolePermission\PermissionController;
use App\Http\Controllers\API\Backend\RolePermission\RolePermissionController;

Route::group(['middleware' => 'jwt.verify'], function ($router) {

	Route::prefix('role')->name('role.')->group(function () {
		Route::get('/', [RoleController::class, 'index'])->name('index');
		Route::post('/', [RoleController::class, 'store'])->name('create');
		Route::put('/', [RoleController::class, 'update'])->name('update');
		Route::delete('/{id}', [RoleController::class, 'delete'])->name('delete');
		Route::post('/status', [RoleController::class, 'changeStatus'])->name('status');
		Route::get('/{id}', [RoleController::class, 'show'])->name('show');
	});

	Route::prefix('permission-module')->name('permission-module.')->group(function () {
		Route::get('/', [PermissionModuleController::class, 'index'])->name('index');
		Route::post('/', [PermissionModuleController::class, 'store'])->name('create');
		Route::put('/', [PermissionModuleController::class, 'update'])->name('update');
		Route::delete('/{id}', [PermissionModuleController::class, 'delete'])->name('delete');
		Route::post('/status', [PermissionModuleController::class, 'changeStatus'])->name('status');
		Route::get('/{id}', [PermissionModuleController::class, 'show'])->name('show');
	});

	Route::prefix('permission')->name('permission.')->group(function () {
		Route::get('/{id}', [PermissionController::class, 'index'])->name('index');
		Route::post('/', [PermissionController::class, 'store'])->name('create');
		Route::put('/', [PermissionController::class, 'update'])->name('update');
		Route::delete('/{id}', [PermissionController::class, 'delete'])->name('delete');
		Route::post('/status', [PermissionController::class, 'changeStatus'])->name('status');
		Route::get('/show/{id}', [PermissionController::class, 'show'])->name('show');
	});

	Route::prefix('role-permission')->name('role-permission.')->group(function () {
		Route::get('/{slug}', [RolePermissionController::class, 'index'])->name('index');
		Route::put('/', [RolePermissionController::class, 'update'])->name('update');
	});


	Route::get('routes', [RolePermissionController::class, 'routes']);

});

