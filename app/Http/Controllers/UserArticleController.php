<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\UserArticleResource;
use App\Http\Resources\UserArticleCollection;
use App\Http\Requests\StoreArtistArticleRequest;

class UserArticleController extends Controller
{

    protected $model;

    public function __construct(ArtistArticle $artistArticle)
    {
        $this->model = $artistArticle;
    }

    public function index(Request $request): UserArticleCollection
    {
        return new UserArticleCollection(
            $this
                ->model
                ->with('artist')
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
                ->byUserId(auth()->id())
                ->get()
        );
    }

    public function show(Request $request, int $id): UserArticleResource
    {
        return new UserArticleResource(
            $this->model->byUserId(auth()->id())->findOrFail($id)
        );
    }

    public function update(StoreArtistArticleRequest $request, int $id): int
    {
        return $this
            ->model
            ->byUserId(auth()->id())
            ->when($request->input('active') == 0, function ($q) {
                $q->active(false);
            })
            ->where('id', $id)
            ->update(
                array_merge(
                    $request->only([
                        'active',
                        'title',
                        'description',
                        'content',
                    ]),
                    [
                        'slug' => str_slug($request->input('title')),
                    ]
                )
            );
    }

    public function destroy(Request $request, $id): int
    {
        return $this
            ->model
            ->byUserId(auth()->id())
            ->active(false)
            ->where('id', $id)
            ->forceDelete();
    }
}
