<?php

namespace App\Lib\Traits;

use Carbon\Carbon;

trait UnixTimestamps
{
    public function getCreatedAtAttribute($val)
    {
        return Carbon::parse($val)->timestamp;
    }

    public function getUpdatedAtAttribute($val)
    {
        return Carbon::parse($val)->timestamp;
    }
}
