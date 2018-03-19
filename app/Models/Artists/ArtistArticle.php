<?php

namespace App\Models\Artists;

use App\Models\Users\User;
use App\Models\Artists\Artist;
use App\Lib\Traits\Detailable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ArtistArticle extends Model
{
    use SoftDeletes, Detailable;

    protected $fillable = [
        'active',
        'prefix',
        'title',
        'slug',
        'description',
        'content',

        'user_id',
        'artist_id',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes

    // Placeholder
    public function scopeOrder($q)
    {
        return $q;
    }

    public function scopeByPrefix($q, $prefix)
    {
        return $q->where('prefix', $prefix);
    }

    public function scopeBySlug($q, $slug)
    {
        return $q->where('slug', $slug);
    }
}
