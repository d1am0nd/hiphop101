<?php

namespace App\Models\Polymorphic;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = ['user_id'];

    public function likable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeByUserId($q, $uid)
    {
        return $q->where('user_id', $uid);
    }
}
