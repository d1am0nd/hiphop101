<?php

namespace App\Lib\Traits;

use DB;
use App\Models\Polymorphic\Like;

trait Likable
{
    // Relationships
    public function likes()
    {
        return $this->morphMany(Like::class, 'likable');
    }

    public function myLike()
    {
        return $this
            ->morphOne(Like::class, 'likable')
            ->byUserId(auth()->id());
    }

    // Scopes
    public function scopePopular($q)
    {
        return $q
            ->withCount('likes')
            ->orderBy('likes_count', 'DESC');
    }


    // Model methods
    public function like($userId)
    {
        if ($this->likes()->byUserId($userId)->first() === null) {
            $this->likes()->create([
                'user_id' => $userId,
            ]);
            return true;
        }
        return false;
    }

    public function unlike($userId)
    {
        if ($this->likes()->byUserId($userId)->delete() !== 0) {
            return true;
        }
        return false;
    }
}
