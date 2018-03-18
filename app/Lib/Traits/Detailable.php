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
        return $this->details()->create([
            'ip' => request()->ip()
        ]);
    }
}
