<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Child
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon $birth_date
 * @property string $gender
 * @property string|null $health_status
 * @property string|null $background_story
 * @property string|null $photo_path
 * @property string $status
 * @property string|null $special_needs
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AdoptionApplication> $adoptionApplications
 * @property-read int $age
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Child newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Child newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Child query()
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereBackgroundStory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereHealthStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child wherePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereSpecialNeeds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Child available()
 * @method static \Database\Factories\ChildFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Child extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'birth_date',
        'gender',
        'health_status',
        'background_story',
        'photo_path',
        'status',
        'special_needs',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
    ];

    /**
     * Get the child's age in years.
     */
    public function getAgeAttribute(): int
    {
        return (int)$this->birth_date->diffInYears(now());
    }

    /**
     * Scope a query to only include available children.
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    /**
     * Get the adoption applications for this child.
     */
    public function adoptionApplications(): HasMany
    {
        return $this->hasMany(AdoptionApplication::class);
    }
}