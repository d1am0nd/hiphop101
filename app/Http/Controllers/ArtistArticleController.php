<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;
use App\Http\Resources\ArtistResource;
use App\Http\Resources\UserArticleResource;
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

    public function index(Request $request, Artist $artist): ArtistArticleCollection
    {
        // Get SQL data
        $result = $artist
            ->articles()
            ->active()
            ->popular()
            ->with('user')
            // If my_articles = 1, show current users articles
            ->when(
                $request->input('my_articles') == 1 &&
                auth()->check(),
                function ($q) {
                    $q->byUserId(auth()->id());
                }
            )
            // If authenticated, add myLike
            ->when(
                auth()->check(),
                function ($q) {
                    $q->with('myLike');
                }
            )
            ->paginate(config('defaults.pagination.per_page'));

        // Add 'artist' to the articles
        $result
            ->getCollection()
            ->transform(function ($i) use ($artist) {
                return $i->setRelation('artist', $artist);
            });

        // Return with pagination and everything
        return (new ArtistArticleCollection(
            $result
        ))->additional([
            'parent' => new ArtistResource($artist),
        ]);
    }

    public function show(Request $request, Artist $artist, string $prefix, string $slug): ArtistArticleResource
    {
        return (new ArtistArticleResource(
            $artist
                ->articles()
                ->byPrefix($prefix)
                ->bySlug($slug)
                ->active()
                ->withCount('likes')
                ->with('user')
                ->when(
                    auth()->check(),
                    function ($q) {
                        $q->with('myLike');
                    }
                )
                ->firstOrFail()
        ))->additional([
            'parent' => new ArtistResource($artist),
        ]);
    }

    public function store(StoreArtistArticleRequest $request, Artist $artist): UserArticleResource
    {
        return (new UserArticleResource(
            $this->model->create(
                array_merge(
                    $request->input(),
                    [
                        'slug' => str_slug($request->input('title')),
                        'artist_id' => $artist->id,
                        'user_id' => auth()->id(),
                        'prefix' => substr(md5(auth()->id()), 0, 6),
                    ]
                )
            )
        ))->additional([
            'parent' => new ArtistResource($artist),
        ]);
    }

    public function like(Request $request, Artist $artist, string $prefix, string $slug): array
    {
        return [
            'data' => $artist
                ->articles()
                ->active()
                ->byPrefix($prefix)
                ->bySlug($slug)
                ->firstOrFail()
                ->like(auth()->id())
        ];
    }

    public function unlike(Request $request, Artist $artist, string $prefix, string $slug): array
    {
        return [
            'data' => $artist
                ->articles()
                ->active()
                ->byPrefix($prefix)
                ->bySlug($slug)
                ->firstOrFail()
                ->unlike(auth()->id())
        ];
    }
}
