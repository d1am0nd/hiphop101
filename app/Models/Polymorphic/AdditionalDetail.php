<?php

namespace App\Models\Polymorphic;

use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;

class AdditionalDetail extends Model
{

    protected $fillable = ['ip', 'user_id'];

    public function detailable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
