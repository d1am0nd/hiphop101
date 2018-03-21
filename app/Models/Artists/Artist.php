<?php

namespace App\Models\Artists;

use DB;
use App\Lib\Traits\Detailable;
use App\Models\Artists\ArtistArticle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artist extends Model
{
    use SoftDeletes, Detailable;

    protected $dates = ['deleted_at'];

    protected $fillable = ['name', 'slug', 'description', 'wikipedia_url'];

    // Relations
    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function articles()
    {
        return $this->hasMany(ArtistArticle::class);
    }


    // Scopes

    // Placeholder
    public function scopeOrder($q)
    {
        return $q->orderBy('name', 'ASC');
    }

    public function scopeBySlug($q, $slug)
    {
        return $q->where('slug', $slug);
    }

    public function scopeSearch($q, $search)
    {
        return $q
            ->selectRaw(
                "*, " .
                "MATCH (name, description) AGAINST(? IN BOOLEAN MODE) as relevancy, " .
                "MATCH (name) AGAINST(? IN BOOLEAN MODE) as name_relevancy",
                ["$search*", "$search*"]
            )
            ->whereRaw(
                "MATCH (name, description) AGAINST(? IN BOOLEAN MODE)",
                ["$search*"]
            )
            ->orderByRaw('relevancy + name_relevancy DESC');
    }
}