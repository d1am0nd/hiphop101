<?php

namespace App\Lib\Traits;

use Carbon\Carbon;

trait UnixTimestamps
{
    public function getCreatedAtAttribute($val): int
    {
        return Carbon::parse($val)->timestamp;
    }

    public function getUpdatedAtAttribute($val): int
    {
        return Carbon::parse($val)->timestamp;
    }
}
