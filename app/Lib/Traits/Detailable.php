<?php

namespace App\Lib\Traits;

use Auth;
use App\Models\Polymorphic\AdditionalDetail;

trait Detailable
{
    public function details()
    {
        return $this->morphOne(AdditionalDetail::class, 'detailable');
    }

    public function addDetails()
    {
        if (Auth::check()) {
            $this->details()->create([
                'ip' => request()->ip(),
                'user_id' => Auth::user()->id
            ]);
        }
        return $this;
    }
}
