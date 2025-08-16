<?php

namespace Database\Factories;

use App\Models\Child;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Child>
 */
class ChildFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $genders = ['male', 'female'];
        $statuses = ['available', 'in_process', 'adopted'];
        
        return [
            'name' => $this->faker->firstName(),
            'birth_date' => $this->faker->dateTimeBetween('-15 years', '-1 year')->format('Y-m-d'),
            'gender' => $this->faker->randomElement($genders),
            'health_status' => $this->faker->optional(0.7)->paragraph(),
            'background_story' => $this->faker->optional(0.8)->paragraphs(2, true),
            'status' => $this->faker->randomElement($statuses),
            'special_needs' => $this->faker->optional(0.2)->sentence(),
        ];
    }

    /**
     * Indicate that the child is available for adoption.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'available',
        ]);
    }

    /**
     * Indicate that the child is in adoption process.
     */
    public function inProcess(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_process',
        ]);
    }

    /**
     * Indicate that the child has been adopted.
     */
    public function adopted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'adopted',
        ]);
    }
}