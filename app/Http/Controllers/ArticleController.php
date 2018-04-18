<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\ArtistArticleCollection;

class ArticleController extends Controller
{

    protected $model;

    public function __construct(ArtistArticle $model)
    {
        $this->model = $model;
    }

    public function index(): ArtistArticleCollection
    {
        return new ArtistArticleCollection(
            $this
                ->model
                ->popular(['title', 'slug', 'prefix', 'description'])
                ->paginate(config('defaults.pagination.per_page'))
        );
    }
}
