<?php

namespace App\Lib\Traits;

use App\Models\Polymorphic\Like;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait Likable
{
    // Relationships
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likable');
    }

    public function myLike(): MorphOne
    {
        return $this
            ->morphOne(Like::class, 'likable')
            ->byUserId(auth()->id());
    }

    // Scopes
    public function scopePopular(Builder $q): Builder
    {
        return $q
            ->withCount('likes')
            ->orderBy('likes_count', 'DESC');
    }


    // Model methods
    public function like(int $userId): bool
    {
        if ($this->likes()->byUserId($userId)->first() === null) {
            $this->likes()->create([
                'user_id' => $userId,
            ]);
            return true;
        }
        return false;
    }

    public function unlike(int $userId): bool
    {
        if ($this->likes()->byUserId($userId)->delete() !== 0) {
            return true;
        }
        return false;
    }
}
