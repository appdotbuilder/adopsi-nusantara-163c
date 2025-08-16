<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAdoptionApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $application = $this->route('adoption_application');
        return auth()->check() && 
               (auth()->user()->isAdmin() || 
                (auth()->user()->isApplicant() && $application->user_id === auth()->id()));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'child_id' => 'nullable|exists:children,id',
            'spouse_name' => 'nullable|string|max:255',
            'spouse_birth_date' => 'nullable|date|before:today',
            'spouse_occupation' => 'nullable|string|max:255',
            'spouse_income' => 'nullable|integer|min:0',
            'adoption_reason' => 'required|string|min:50',
            'child_preferences' => 'nullable|string|max:1000',
            'has_other_children' => 'boolean',
            'other_children_count' => 'integer|min:0',
            'requested_child_name' => 'nullable|string|max:255',
            'requested_child_birth_date' => 'nullable|date|before:today',
            'requested_child_gender' => 'nullable|in:male,female',
        ];

        // Admin-only fields
        if (auth()->user()->isAdmin()) {
            $rules = array_merge($rules, [
                'status' => 'string|in:draft,submitted,document_review,document_verified,survey_scheduled,survey_completed,interview_scheduled,interview_completed,approved,rejected',
                'survey_score' => 'nullable|integer|min:0|max:100',
                'interview_score' => 'nullable|integer|min:0|max:100',
                'admin_notes' => 'nullable|string',
                'rejection_reason' => 'nullable|string',
                'survey_scheduled_at' => 'nullable|date|after:now',
                'interview_scheduled_at' => 'nullable|date|after:now',
            ]);
        }

        // Document uploads (optional for updates)
        $documentRules = [
            'id_card' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'family_card' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'marriage_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'income_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'health_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'police_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];

        return array_merge($rules, $documentRules);
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'adoption_reason.required' => 'Please provide your reason for adoption.',
            'adoption_reason.min' => 'Please provide at least 50 characters explaining your reason.',
            '*.mimes' => 'Document must be a PDF, JPG, JPEG, or PNG file.',
            '*.max' => 'Document size must not exceed 2MB.',
        ];
    }
}