<?php

use App\Http\Controllers\DiagramController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/diagram/class', [DiagramController::class, 'index'])->name('diagram');

Route::get('/dashboard', [DiagramController::class, 'show'])->name('diagram.dashboard');
Route::get('/diagrams/test', [DiagramController::class, 'show'])->name('diagram.index');

Route::get('/', [DiagramController::class, 'show'])->name('diagram.kitchen-sink');
Route::get('/show-cruds', [DiagramController::class, 'show_cruds'])->name('diagram.show-cruds');
Route::get('/download-crud', [DiagramController::class, 'download_crud'])->name('download-crud');

// Route::middleware([
//     'auth:sanctum',
//     config('jetstream.auth_session'),
//     'verified'
// ])->group(function () {
//     Route::get('/dashboard', function () {
//         return view('dashboard');
//     })->name('dashboard');
// });
