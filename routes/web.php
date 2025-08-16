<?php

use App\Http\Controllers\AdoptionApplicationController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return app(DashboardController::class)->index();
    })->name('dashboard');
    
    // Adoption Applications Routes
    Route::resource('adoption-applications', AdoptionApplicationController::class);
    
    // Children Routes
    Route::resource('children', ChildController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';