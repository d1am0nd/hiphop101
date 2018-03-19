<?php

namespace App\Models\Artists;

use App\Lib\Traits\Detailable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artist extends Model
{
    use SoftDeletes, Detailable;

    protected $dates = ['deleted_at'];

    protected $fillable = ['name', 'slug', 'description', 'wikipedia_url'];

    public function scopeBySlug($q, $slug)
    {
        return $q->where('slug', $slug);
    }

    public function scopeSearch($q, $search)
    {
        return $q->where('name', 'LIKE', "%$search%");
    }
}
