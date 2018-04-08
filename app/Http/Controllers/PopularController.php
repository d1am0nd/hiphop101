<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\ArtistCollection;
use App\Http\Resources\ArtistArticleCollection;

class PopularController extends Controller
{
    protected $articles;

    protected $artists;

    public function __construct(ArtistArticle $articles, Artist $artists)
    {
        $this->articles = $articles;
        $this->artists = $artists;
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
                    'active',
                    'slug',
                    'prefix',
                    'description',
                    'title'
                ])
                ->paginate(config('defaults.pagination.per_page'))
        );
    }

    public function artists(Request $request)
    {
        return new ArtistCollection(
            $this
                ->artists
                ->popular()
                ->paginate(config('defaults.pagination.per_page'))
        );
    }
}
