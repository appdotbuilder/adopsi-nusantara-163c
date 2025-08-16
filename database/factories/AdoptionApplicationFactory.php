<?php

namespace Database\Factories;

use App\Models\AdoptionApplication;
use App\Models\Child;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdoptionApplication>
 */
class AdoptionApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = array_keys(AdoptionApplication::$statusFlow);
        $status = $this->faker->randomElement($statuses);
        
        return [
            'user_id' => User::factory(),
            'child_id' => $this->faker->optional(0.6)->randomElement(Child::pluck('id')->toArray()),
            'application_number' => 'ADO-' . date('Y') . '-' . str_pad((string)$this->faker->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT),
            'status' => $status,
            'spouse_name' => $this->faker->optional(0.7)->name(),
            'spouse_birth_date' => $this->faker->optional(0.7)->dateTimeBetween('-60 years', '-20 years'),
            'spouse_occupation' => $this->faker->optional(0.7)->jobTitle(),
            'spouse_income' => $this->faker->optional(0.7)->numberBetween(3000000, 20000000),
            'adoption_reason' => $this->faker->paragraphs(2, true),
            'child_preferences' => $this->faker->optional(0.8)->paragraph(),
            'has_other_children' => $this->faker->boolean(30),
            'other_children_count' => $this->faker->numberBetween(0, 3),
            'requested_child_name' => $this->faker->optional(0.3)->firstName(),
            'requested_child_birth_date' => $this->faker->optional(0.3)->dateTimeBetween('-10 years', '-1 year'),
            'requested_child_gender' => $this->faker->optional(0.3)->randomElement(['male', 'female']),
            'survey_score' => in_array($status, ['survey_completed', 'interview_scheduled', 'interview_completed', 'approved', 'rejected']) 
                ? $this->faker->numberBetween(60, 95) : null,
            'interview_score' => in_array($status, ['interview_completed', 'approved', 'rejected']) 
                ? $this->faker->numberBetween(65, 95) : null,
            'submitted_at' => in_array($status, ['draft']) ? null : $this->faker->dateTimeBetween('-6 months', 'now'),
            'survey_scheduled_at' => in_array($status, ['survey_scheduled', 'survey_completed', 'interview_scheduled', 'interview_completed', 'approved', 'rejected']) 
                ? $this->faker->dateTimeBetween('-3 months', '+1 month') : null,
            'interview_scheduled_at' => in_array($status, ['interview_scheduled', 'interview_completed', 'approved', 'rejected']) 
                ? $this->faker->dateTimeBetween('-2 months', '+1 month') : null,
            'decision_date' => in_array($status, ['approved', 'rejected']) ? $this->faker->dateTimeBetween('-1 month', 'now') : null,
            'admin_notes' => $this->faker->optional(0.4)->paragraph(),
            'rejection_reason' => $status === 'rejected' ? $this->faker->sentence() : null,
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (AdoptionApplication $application) {
            // Calculate total score if both scores exist
            if ($application->survey_score && $application->interview_score) {
                $application->update([
                    'total_score' => ($application->survey_score + $application->interview_score) / 2
                ]);
            }
        });
    }

    /**
     * Indicate that the application is in draft status.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'submitted_at' => null,
        ]);
    }

    /**
     * Indicate that the application has been submitted.
     */
    public function submitted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'submitted',
            'submitted_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the application is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'submitted_at' => $this->faker->dateTimeBetween('-6 months', '-3 months'),
            'survey_score' => $this->faker->numberBetween(80, 95),
            'interview_score' => $this->faker->numberBetween(80, 95),
            'decision_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ]);
    }

    /**
     * Indicate that the application is rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'rejected',
            'submitted_at' => $this->faker->dateTimeBetween('-6 months', '-2 months'),
            'decision_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'rejection_reason' => $this->faker->sentence(),
        ]);
    }
}