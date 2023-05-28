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

Route::get('/', [DiagramController::class, 'index'])->name('diagram');

Route::get('/dashboard', [DiagramController::class, 'index'])->name('diagram.dashboard');
Route::get('/diagrams/test', [DiagramController::class, 'index'])->name('diagram.index');

// Route::middleware([
//     'auth:sanctum',
//     config('jetstream.auth_session'),
//     'verified'
// ])->group(function () {
//     Route::get('/dashboard', function () {
//         return view('dashboard');
//     })->name('dashboard');
// });
