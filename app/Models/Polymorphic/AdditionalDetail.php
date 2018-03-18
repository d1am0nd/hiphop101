<?php

namespace App\Models\Polymorphic;

use Illuminate\Database\Eloquent\Model;

class AdditionalDetail extends Model
{

    protected $fillable = ['ip'];

    public function detailable()
    {
        return $this->morphTo();
    }
}
