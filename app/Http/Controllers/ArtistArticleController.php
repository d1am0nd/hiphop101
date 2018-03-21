<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\ArtistArticleResource;

class ArtistArticleController extends Controller
{

    protected $model;

    public function __construct(ArtistArticle $artistArticle)
    {
        $this->model = $artistArticle;
    }

    public function index(Request $request, Artist $artist)
    {
        return ArtistArticleResource::collection(
            $artist
                ->articles()
                ->paginate(config('defaults.pagination.per_page'))
        );
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

    public function store(Request $request, Artist $artist)
    {

    }
}