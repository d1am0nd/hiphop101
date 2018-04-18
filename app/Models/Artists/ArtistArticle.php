<?php

namespace App\Models\Artists;

use App\Models\Users\User;
use App\Models\Artists\Artist;
use App\Lib\Traits\Likable;
use App\Lib\Traits\Detailable;
use App\Lib\Traits\UnixTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ArtistArticle extends Model
{
    use SoftDeletes, Detailable, UnixTimestamps, Likable;

    protected $fillable = [
        'active',
        'prefix',
        'title',
        'slug',
        'description',
        'content',

        'user_id',
        'artist_id',
    ];

    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scopes

    // Placeholder
    public function scopeOrder(Builder $q): Builder
    {
        return $q;
    }

    public function scopeByPrefix(Builder $q, string $prefix): Builder
    {
        return $q->where('prefix', $prefix);
    }

    public function scopeBySlug(Builder $q, string $slug): Builder
    {
        return $q->where('slug', $slug);
    }

    public function scopeByUserId(Builder $q, int $uid): Builder
    {
        return $q->where('artist_articles.user_id', $uid);
    }

    public function scopeActive(Builder $q, bool $true = true): Builder
    {
        return $q->where('active', $true);
    }

    public function scopeNotByUser(Builder $q, int $uid): Builder
    {
        return $q->where('user_id', '!=', $uid);
    }
}
