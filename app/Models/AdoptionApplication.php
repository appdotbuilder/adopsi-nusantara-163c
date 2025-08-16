<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\AdoptionApplication
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $child_id
 * @property string $application_number
 * @property string $status
 * @property string|null $spouse_name
 * @property \Illuminate\Support\Carbon|null $spouse_birth_date
 * @property string|null $spouse_occupation
 * @property int|null $spouse_income
 * @property string $adoption_reason
 * @property string|null $child_preferences
 * @property bool $has_other_children
 * @property int $other_children_count
 * @property string|null $requested_child_name
 * @property \Illuminate\Support\Carbon|null $requested_child_birth_date
 * @property string|null $requested_child_gender
 * @property string|null $id_card_path
 * @property string|null $family_card_path
 * @property string|null $marriage_certificate_path
 * @property string|null $income_certificate_path
 * @property string|null $health_certificate_path
 * @property string|null $police_certificate_path
 * @property int|null $survey_score
 * @property int|null $interview_score
 * @property int|null $total_score
 * @property \Illuminate\Support\Carbon|null $submitted_at
 * @property \Illuminate\Support\Carbon|null $survey_scheduled_at
 * @property \Illuminate\Support\Carbon|null $interview_scheduled_at
 * @property \Illuminate\Support\Carbon|null $decision_date
 * @property string|null $admin_notes
 * @property string|null $rejection_reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Child|null $child
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ApplicationStatusLog> $statusLogs
 * @property-read array $progress_percentage
 * @property-read string $status_label
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AdoptionApplication newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdoptionApplication newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdoptionApplication query()
 * @method static \Illuminate\Database\Eloquent\Builder|AdoptionApplication whereStatus($value)
 * @method static \Database\Factories\AdoptionApplicationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class AdoptionApplication extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'child_id',
        'application_number',
        'status',
        'spouse_name',
        'spouse_birth_date',
        'spouse_occupation',
        'spouse_income',
        'adoption_reason',
        'child_preferences',
        'has_other_children',
        'other_children_count',
        'requested_child_name',
        'requested_child_birth_date',
        'requested_child_gender',
        'id_card_path',
        'family_card_path',
        'marriage_certificate_path',
        'income_certificate_path',
        'health_certificate_path',
        'police_certificate_path',
        'survey_score',
        'interview_score',
        'total_score',
        'submitted_at',
        'survey_scheduled_at',
        'interview_scheduled_at',
        'decision_date',
        'admin_notes',
        'rejection_reason',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'spouse_birth_date' => 'date',
        'requested_child_birth_date' => 'date',
        'has_other_children' => 'boolean',
        'submitted_at' => 'datetime',
        'survey_scheduled_at' => 'datetime',
        'interview_scheduled_at' => 'datetime',
        'decision_date' => 'datetime',
    ];

    /**
     * The status flow steps and their labels.
     */
    public static $statusFlow = [
        'draft' => 'Draft',
        'submitted' => 'Submitted',
        'document_review' => 'Document Review',
        'document_verified' => 'Documents Verified',
        'survey_scheduled' => 'Survey Scheduled',
        'survey_completed' => 'Survey Completed',
        'interview_scheduled' => 'Interview Scheduled',
        'interview_completed' => 'Interview Completed',
        'approved' => 'Approved',
        'rejected' => 'Rejected',
    ];

    /**
     * Generate unique application number.
     */
    public static function generateApplicationNumber(): string
    {
        $prefix = 'ADO-' . date('Y') . '-';
        $lastApplication = static::where('application_number', 'like', $prefix . '%')
            ->orderBy('application_number', 'desc')
            ->first();

        if ($lastApplication) {
            $lastNumber = (int) substr($lastApplication->application_number, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad((string)$newNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get the progress percentage for the application.
     */
    public function getProgressPercentageAttribute(): array
    {
        $statusSteps = array_keys(self::$statusFlow);
        $currentIndex = array_search($this->status, $statusSteps);
        
        if ($currentIndex === false) {
            return ['percentage' => 0, 'step' => 0, 'total' => count($statusSteps)];
        }

        // Special handling for rejected status
        if ($this->status === 'rejected') {
            return ['percentage' => 100, 'step' => count($statusSteps), 'total' => count($statusSteps)];
        }

        $percentage = (((int)$currentIndex + 1) / count($statusSteps)) * 100;
        
        return [
            'percentage' => round($percentage, 1),
            'step' => (int)$currentIndex + 1,
            'total' => count($statusSteps)
        ];
    }

    /**
     * Get the human-readable status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return self::$statusFlow[$this->status] ?? $this->status;
    }

    /**
     * Get the user that owns the adoption application.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the child associated with the adoption application.
     */
    public function child(): BelongsTo
    {
        return $this->belongsTo(Child::class);
    }

    /**
     * Get the status logs for the application.
     */
    public function statusLogs(): HasMany
    {
        return $this->hasMany(ApplicationStatusLog::class);
    }
}