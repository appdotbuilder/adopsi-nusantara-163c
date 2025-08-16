<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChildRequest;
use App\Http\Requests\UpdateChildRequest;
use App\Models\Child;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $children = Child::latest()->paginate(12);

        return Inertia::render('children/index', [
            'children' => $children,
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Only admin can create children
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('children/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChildRequest $request)
    {
        $data = $request->validated();

        // Handle photo upload
        if ($request->hasFile('photo')) {
            $data['photo_path'] = $request->file('photo')->store('child-photos', 'public');
        }

        $child = Child::create($data);

        return redirect()->route('children.show', $child)
            ->with('success', 'Child profile created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Child $child)
    {
        $child->load('adoptionApplications.user');

        return Inertia::render('children/show', [
            'child' => $child,
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Child $child)
    {
        // Only admin can edit children
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        return Inertia::render('children/edit', [
            'child' => $child,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreChildRequest $request, Child $child)
    {
        $data = $request->validated();

        // Handle photo upload
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($child->photo_path) {
                Storage::disk('public')->delete($child->photo_path);
            }
            $data['photo_path'] = $request->file('photo')->store('child-photos', 'public');
        }

        $child->update($data);

        return redirect()->route('children.show', $child)
            ->with('success', 'Child profile updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Child $child)
    {
        // Only admin can delete children
        if (!auth()->user()->isAdmin()) {
            abort(403);
        }

        // Check if child has active applications
        if ($child->adoptionApplications()->whereNotIn('status', ['draft', 'rejected'])->exists()) {
            return back()->with('error', 'Cannot delete child with active adoption applications.');
        }

        // Delete photo if exists
        if ($child->photo_path) {
            Storage::disk('public')->delete($child->photo_path);
        }

        $child->delete();

        return redirect()->route('children.index')
            ->with('success', 'Child profile deleted successfully.');
    }
}