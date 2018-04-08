<?php

namespace App\Lib\Traits;

use App\Models\Polymorphic\AdditionalDetail;

trait Detailable
{
    public function details()
    {
        return $this->morphOne(AdditionalDetail::class, 'detailable');
    }

    public function addDetails()
    {
        $this->details()->create([
            'ip' => request()->ip(),
            'user_id' => auth()->check() ? auth()->id() : null,
        ]);
        return $this;
    }
}
