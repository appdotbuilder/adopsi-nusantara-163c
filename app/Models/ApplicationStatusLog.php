<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ApplicationStatusLog
 *
 * @property int $id
 * @property int $adoption_application_id
 * @property string $from_status
 * @property string $to_status
 * @property string|null $notes
 * @property int|null $changed_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\AdoptionApplication $adoptionApplication
 * @property-read \App\Models\User|null $changedBy
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereAdoptionApplicationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereChangedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereFromStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereToStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationStatusLog whereUpdatedAt($value)
 * @method static \Database\Factories\ApplicationStatusLogFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ApplicationStatusLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'adoption_application_id',
        'from_status',
        'to_status',
        'notes',
        'changed_by',
    ];

    /**
     * Get the adoption application that owns the status log.
     */
    public function adoptionApplication(): BelongsTo
    {
        return $this->belongsTo(AdoptionApplication::class);
    }

    /**
     * Get the user who changed the status.
     */
    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}