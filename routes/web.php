<?php

use App\Http\Controllers\PersonController;
use App\Http\Controllers\CalculatorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::controller(CalculatorController::class)->group(function () {
    Route::get('/calculator', 'index');
    Route::post('/calculator/sum', 'sum')->name('calculator.sum');
});

Route::controller(PersonController::class)->group(function () {
    Route::get('/persons', 'index');
    Route::get('/persons/{id}', 'show');
    Route::post('/persons', 'store')->name('persons.store');
    Route::put('/persons/{person}', 'update')->name('persons.update');
    Route::delete('/persons/{person}', 'destroy')->name('persons.delete');
});