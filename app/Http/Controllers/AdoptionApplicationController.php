<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAdoptionApplicationRequest;
use App\Http\Requests\UpdateAdoptionApplicationRequest;
use App\Models\AdoptionApplication;
use App\Models\ApplicationStatusLog;
use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdoptionApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $applications = AdoptionApplication::with(['user', 'child'])
                ->latest()
                ->paginate(10);
        } else {
            $applications = $user->adoptionApplications()
                ->with('child')
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('adoption-applications/index', [
            'applications' => $applications,
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $availableChildren = Child::available()->get();

        return Inertia::render('adoption-applications/create', [
            'availableChildren' => $availableChildren,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdoptionApplicationRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['application_number'] = AdoptionApplication::generateApplicationNumber();
        $data['status'] = 'draft';

        // Handle file uploads
        $documentFields = [
            'id_card', 'family_card', 'marriage_certificate',
            'income_certificate', 'health_certificate', 'police_certificate'
        ];

        foreach ($documentFields as $field) {
            if ($request->hasFile($field)) {
                $data[$field . '_path'] = $request->file($field)->store('adoption-documents', 'private');
            }
        }

        $application = AdoptionApplication::create($data);

        // Log status creation
        ApplicationStatusLog::create([
            'adoption_application_id' => $application->id,
            'from_status' => '',
            'to_status' => 'draft',
            'notes' => 'Application created',
            'changed_by' => auth()->id(),
        ]);

        return redirect()->route('adoption-applications.show', $application)
            ->with('success', 'Application created successfully. Application number: ' . $application->application_number);
    }

    /**
     * Display the specified resource.
     */
    public function show(AdoptionApplication $adoptionApplication)
    {
        $adoptionApplication->load(['user', 'child', 'statusLogs.changedBy']);

        // Check authorization
        $user = auth()->user();
        if (!$user->isAdmin() && $adoptionApplication->user_id !== $user->id) {
            abort(403);
        }

        return Inertia::render('adoption-applications/show', [
            'application' => $adoptionApplication,
            'isAdmin' => $user->isAdmin(),
            'statusFlow' => AdoptionApplication::$statusFlow,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdoptionApplication $adoptionApplication)
    {
        $user = auth()->user();
        
        // Check authorization
        if (!$user->isAdmin() && $adoptionApplication->user_id !== $user->id) {
            abort(403);
        }

        $availableChildren = Child::available()->get();

        return Inertia::render('adoption-applications/edit', [
            'application' => $adoptionApplication,
            'availableChildren' => $availableChildren,
            'isAdmin' => $user->isAdmin(),
            'statusFlow' => AdoptionApplication::$statusFlow,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdoptionApplicationRequest $request, AdoptionApplication $adoptionApplication)
    {
        $data = $request->validated();
        $oldStatus = $adoptionApplication->status;

        // Handle file uploads
        $documentFields = [
            'id_card', 'family_card', 'marriage_certificate',
            'income_certificate', 'health_certificate', 'police_certificate'
        ];

        foreach ($documentFields as $field) {
            if ($request->hasFile($field)) {
                // Delete old file if exists
                if ($adoptionApplication->{$field . '_path'}) {
                    Storage::disk('private')->delete($adoptionApplication->{$field . '_path'});
                }
                $data[$field . '_path'] = $request->file($field)->store('adoption-documents', 'private');
            }
        }

        // Calculate total score if both scores are present
        if (isset($data['survey_score']) && isset($data['interview_score'])) {
            $data['total_score'] = ($data['survey_score'] + $data['interview_score']) / 2;
        }

        $adoptionApplication->update($data);

        // Log status change if status was updated
        if (isset($data['status']) && $data['status'] !== $oldStatus) {
            ApplicationStatusLog::create([
                'adoption_application_id' => $adoptionApplication->id,
                'from_status' => $oldStatus,
                'to_status' => $data['status'],
                'notes' => $request->input('admin_notes'),
                'changed_by' => auth()->id(),
            ]);
        }

        return redirect()->route('adoption-applications.show', $adoptionApplication)
            ->with('success', 'Application updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdoptionApplication $adoptionApplication)
    {
        // Check authorization - only admin or owner can delete
        $user = auth()->user();
        if (!$user->isAdmin() && $adoptionApplication->user_id !== $user->id) {
            abort(403);
        }

        // Only allow deletion of draft applications
        if ($adoptionApplication->status !== 'draft') {
            return back()->with('error', 'Only draft applications can be deleted.');
        }

        // Delete uploaded documents
        $documentFields = [
            'id_card_path', 'family_card_path', 'marriage_certificate_path',
            'income_certificate_path', 'health_certificate_path', 'police_certificate_path'
        ];

        foreach ($documentFields as $field) {
            if ($adoptionApplication->$field) {
                Storage::disk('private')->delete($adoptionApplication->$field);
            }
        }

        $adoptionApplication->delete();

        return redirect()->route('adoption-applications.index')
            ->with('success', 'Application deleted successfully.');
    }
}