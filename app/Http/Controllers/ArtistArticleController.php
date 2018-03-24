<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\ArtistResource;
use App\Http\Resources\ArtistArticleResource;
use App\Http\Resources\ArtistArticleCollection;
use App\Http\Requests\StoreArtistArticleRequest;

class ArtistArticleController extends Controller
{

    protected $model;

    public function __construct(ArtistArticle $artistArticle)
    {
        $this->model = $artistArticle;
    }

    public function index(Request $request, Artist $artist)
    {
        return (new ArtistArticleCollection(
            $artist
                ->articles()
                ->paginate(config('defaults.pagination.per_page'))
        ))->additional([
            'parent' => new ArtistResource($artist),
        ]);
    }

    public function show(Request $request, Artist $artist, $prefix, $slug)
    {
        return new ArtistArticleResource(
            $artist
                ->articles()
                ->byPrefix($prefix)
                ->bySlug($slug)
                ->firstOrFail()
        );
    }

    public function store(StoreArtistArticleRequest $request, Artist $artist)
    {
        return [
            'data' => 'success',
        ];
    }
}
