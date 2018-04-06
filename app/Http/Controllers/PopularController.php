<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\ArtistArticleCollection;

class PopularController extends Controller
{
    protected $articles;

    public function __construct(ArtistArticle $articles)
    {
        $this->articles = $articles;
    }

    public function articles(Request $request)
    {
        return new ArtistArticleCollection(
            $this
                ->articles
                ->active()
                ->with(['artist', 'user'])
                ->popular([
                    'artist_articles.artist_id',
                    'artist_articles.user_id',
                    'artist_articles.updated_at',
                    'slug',
                    'prefix',
                    'description',
                    'title'
                ])
                ->paginate(config('defaults.pagination.per_page'))
        );
    }
}
