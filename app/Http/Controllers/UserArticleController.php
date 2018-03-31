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

    public function index(Request $request)
    {
        return new UserArticleCollection(
            $this
                ->model
                ->with('artist')
                ->withCount('likes')
                ->byUserId(auth()->id())
                ->get()
                // ->paginate(config('defaults.pagination.per_page'))
        );
    }

    public function show(Request $request, $id)
    {
        return new UserArticleResource(
            $this->model->byUserId(auth()->id())->findOrFail($id)
        );
    }

    public function update(StoreArtistArticleRequest $request, $id)
    {
        return $this
            ->model
            ->byUserId(auth()->id())
            ->when($request->input('active') == 1, function ($q) {
                $q->active();
            })
            ->where('id', $id)
            ->update(
                array_merge(
                    $request->only([
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

    public function destroy(Request $request, $id)
    {
        return $this
            ->model
            ->byUserId(auth()->id())
            ->active(false)
            ->where('id', $id)
            ->forceDelete();
    }
}
