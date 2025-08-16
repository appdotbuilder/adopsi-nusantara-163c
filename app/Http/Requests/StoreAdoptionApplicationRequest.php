<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdoptionApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isApplicant();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
            'id_card' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'family_card' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'marriage_certificate' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'income_certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'health_certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'police_certificate' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ];
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
            'id_card.required' => 'Identity card document is required.',
            'family_card.required' => 'Family card document is required.',
            'income_certificate.required' => 'Income certificate is required.',
            'health_certificate.required' => 'Health certificate is required.',
            'police_certificate.required' => 'Police certificate is required.',
            '*.mimes' => 'Document must be a PDF, JPG, JPEG, or PNG file.',
            '*.max' => 'Document size must not exceed 2MB.',
        ];
    }
}