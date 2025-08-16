<?php

namespace Database\Seeders;

use App\Models\AdoptionApplication;
use App\Models\ApplicationStatusLog;
use App\Models\Child;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin Dinas Sosial',
            'email' => 'admin@dinassosial.go.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '021-12345678',
            'address' => 'Jl. Merdeka No. 1, Jakarta Pusat',
            'birth_date' => '1980-01-01',
            'occupation' => 'Civil Servant',
            'marital_status' => 'married',
            'income' => 15000000,
        ]);

        // Create sample applicant users
        User::factory(10)->create([
            'role' => 'applicant',
        ]);

        // Create sample children
        Child::factory(15)->available()->create();
        Child::factory(5)->inProcess()->create();
        Child::factory(3)->adopted()->create();

        // Create sample adoption applications
        $users = User::where('role', 'applicant')->get();
        foreach ($users as $user) {
            if (random_int(1, 100) <= 80) { // 80% chance to have an application
                AdoptionApplication::factory()->create([
                    'user_id' => $user->id,
                ]);
            }
        }

        // Create some status logs for applications
        $applications = AdoptionApplication::all();
        foreach ($applications as $application) {
            // Create initial status log
            ApplicationStatusLog::create([
                'adoption_application_id' => $application->id,
                'from_status' => '',
                'to_status' => 'draft',
                'notes' => 'Application created',
                'changed_by' => $application->user_id,
                'created_at' => $application->created_at,
            ]);

            // Create additional logs based on current status
            if ($application->status !== 'draft') {
                ApplicationStatusLog::create([
                    'adoption_application_id' => $application->id,
                    'from_status' => 'draft',
                    'to_status' => 'submitted',
                    'notes' => 'Application submitted by applicant',
                    'changed_by' => $application->user_id,
                    'created_at' => $application->submitted_at,
                ]);

                if (in_array($application->status, ['approved', 'rejected'])) {
                    ApplicationStatusLog::create([
                        'adoption_application_id' => $application->id,
                        'from_status' => 'interview_completed',
                        'to_status' => $application->status,
                        'notes' => $application->status === 'approved' ? 'Application approved after review' : $application->rejection_reason,
                        'changed_by' => 1, // Admin user
                        'created_at' => $application->decision_date,
                    ]);
                }
            }
        }
    }
}