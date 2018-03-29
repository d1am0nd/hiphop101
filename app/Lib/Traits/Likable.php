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
    public function scopeJoinLikesCount($q, $select = ['*'])
    {
        $table = self::getTable();
        $class = self::class;
        return $q
            ->leftJoin('likes', function ($q) use ($table, $class) {
                $q
                    ->on('likes.likable_id', '=', "$table.id")
                    ->where('likes.likable_type', '=', $class);
            })
            ->select(
                array_merge(
                    $select,
                    ["$table.id", DB::raw('COALESCE(COUNT(likes.id), 0) as likes_count')]
                )
            )
            ->groupBy("$table.id");
    }

    public function scopePopular($q, $select = ['*'])
    {
        return $q
            ->joinLikesCount($select)
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
        if ($this->likes()->byUserId($userId)->delete() != 0) {
            return true;
        }
        return false;
    }
}
