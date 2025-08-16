<?php

namespace Database\Factories;

use App\Models\AdoptionApplication;
use App\Models\ApplicationStatusLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ApplicationStatusLog>
 */
class ApplicationStatusLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = array_keys(AdoptionApplication::$statusFlow);
        $fromIndex = $this->faker->numberBetween(0, count($statuses) - 2);
        $toIndex = $fromIndex + 1;
        
        return [
            'adoption_application_id' => AdoptionApplication::factory(),
            'from_status' => $statuses[$fromIndex],
            'to_status' => $statuses[$toIndex],
            'notes' => $this->faker->optional(0.6)->sentence(),
            'changed_by' => User::factory(),
        ];
    }
}