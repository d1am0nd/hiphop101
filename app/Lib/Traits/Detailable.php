<?php

namespace App\Lib\Traits;

use App\Models\Polymorphic\AdditionalDetail;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait Detailable
{
    public function details(): MorphOne
    {
        return $this->morphOne(AdditionalDetail::class, 'detailable');
    }

    public function addDetails(): parent
    {
        $this->details()->create([
            'ip' => request()->ip(),
            'user_id' => auth()->check() ? auth()->id() : null,
        ]);
        return $this;
    }
}
