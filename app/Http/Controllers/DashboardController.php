<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AdoptionApplication;
use App\Models\Child;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return $this->show();
        } else {
            return $this->create();
        }
    }

    /**
     * Admin dashboard with statistics and overview.
     */
    public function show()
    {
        $stats = [
            'total_applications' => AdoptionApplication::count(),
            'pending_review' => AdoptionApplication::whereIn('status', ['submitted', 'document_review'])->count(),
            'approved_applications' => AdoptionApplication::where('status', 'approved')->count(),
            'total_children' => Child::count(),
            'available_children' => Child::where('status', 'available')->count(),
            'total_applicants' => User::where('role', 'applicant')->count(),
        ];

        // Recent applications
        $recentApplications = AdoptionApplication::with(['user', 'child'])
            ->latest()
            ->limit(5)
            ->get();

        // Applications by status for chart
        $applicationsByStatus = [];
        
        // Monthly applications trend (last 6 months)
        $monthlyApplications = [];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'applicationsByStatus' => $applicationsByStatus,
            'monthlyApplications' => $monthlyApplications,
        ]);
    }

    /**
     * Applicant dashboard with their applications and available children.
     */
    public function create()
    {
        $user = auth()->user();

        // User's applications
        $myApplications = $user->adoptionApplications()
            ->with('child')
            ->latest()
            ->limit(3)
            ->get();

        // Available children
        $availableChildren = Child::where('status', 'available')
            ->latest()
            ->limit(6)
            ->get();

        $stats = [
            'my_applications' => $user->adoptionApplications()->count(),
            'pending_applications' => $user->adoptionApplications()
                ->whereNotIn('status', ['approved', 'rejected'])
                ->count(),
            'available_children' => Child::where('status', 'available')->count(),
        ];

        return Inertia::render('applicant/dashboard', [
            'myApplications' => $myApplications,
            'availableChildren' => $availableChildren,
            'stats' => $stats,
        ]);
    }
}