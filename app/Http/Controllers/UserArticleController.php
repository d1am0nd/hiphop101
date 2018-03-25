<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\UserArticleCollection;

class UserArticleController extends Controller
{

    protected $model;

    public function __construct(ArtistArticle $artistArticle)
    {
        $this->model = $artistArticle;
    }

    public function index(Request $request)
    {
        return new UserArticleCollection(
            $this
                ->model
                ->with('artist')
                ->byUserId(auth()->id())
                ->paginate(config('defaults.pagination.per_page'))
        );
    }
}
