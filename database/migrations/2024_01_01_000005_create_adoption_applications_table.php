<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('adoption_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('child_id')->nullable()->constrained()->onDelete('set null');
            $table->string('application_number')->unique();
            $table->enum('status', [
                'draft',
                'submitted', 
                'document_review',
                'document_verified',
                'survey_scheduled',
                'survey_completed',
                'interview_scheduled', 
                'interview_completed',
                'approved',
                'rejected'
            ])->default('draft');
            
            // Applicant spouse information
            $table->string('spouse_name')->nullable();
            $table->date('spouse_birth_date')->nullable();
            $table->string('spouse_occupation')->nullable();
            $table->integer('spouse_income')->nullable();
            
            // Motivation and preferences
            $table->text('adoption_reason');
            $table->text('child_preferences')->nullable();
            $table->boolean('has_other_children')->default(false);
            $table->integer('other_children_count')->default(0);
            
            // Child information if specific child requested
            $table->string('requested_child_name')->nullable();
            $table->date('requested_child_birth_date')->nullable();
            $table->enum('requested_child_gender', ['male', 'female'])->nullable();
            
            // Document paths
            $table->string('id_card_path')->nullable();
            $table->string('family_card_path')->nullable();
            $table->string('marriage_certificate_path')->nullable();
            $table->string('income_certificate_path')->nullable();
            $table->string('health_certificate_path')->nullable();
            $table->string('police_certificate_path')->nullable();
            
            // Survey and interview scores
            $table->integer('survey_score')->nullable();
            $table->integer('interview_score')->nullable();
            $table->integer('total_score')->nullable();
            
            // Dates
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('survey_scheduled_at')->nullable();
            $table->timestamp('interview_scheduled_at')->nullable();
            $table->timestamp('decision_date')->nullable();
            
            // Admin notes
            $table->text('admin_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('application_number');
            $table->index('submitted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adoption_applications');
    }
};