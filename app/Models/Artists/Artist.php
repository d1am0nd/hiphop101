<?php

namespace App\Models\Artists;

use App\Lib\Traits\Detailable;
use App\Models\Artists\ArtistArticle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Artist extends Model
{
    use SoftDeletes, Detailable;

    protected $dates = ['deleted_at'];

    protected $fillable = ['name', 'slug', 'description', 'wikipedia_url'];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // Relations
    public function articles(): HasMany
    {
        return $this->hasMany(ArtistArticle::class);
    }

    // Scopes

    // Placeholder
    public function scopeOrder(Builder $q): Builder
    {
        return $q->orderBy('name', 'ASC');
    }

    public function scopeBySlug(Builder $q, string $slug): Builder
    {
        return $q->where('slug', $slug);
    }

    public function scopeSearch(Builder $q, string $search): Builder
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

    public function scopePopular(Builder $q): Builder
    {
        return $q
            ->withCount('articles')
            ->orderBy('articles_count', 'DESC');
    }
}
