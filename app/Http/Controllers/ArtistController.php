<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Artists\Artist;
use App\Http\Resources\ArtistResource;
use App\Http\Requests\StoreArtistRequest;

class ArtistController extends Controller
{

    protected $model;

    public function __construct(Artist $artist)
    {
        $this->model = $artist;
    }

    public function index(Request $request)
    {
        return ArtistResource::collection(
            $this
                ->model
                ->when($request->input('search', false), function ($q) use ($request) {
                    $q->search($request->input('search'));
                })
                ->order()
                ->paginate(config('defaults.pagination.per_page'))
        );
    }

    public function show(Request $request, Artist $artist)
    {
        return new ArtistResource($artist);
    }

    public function store(StoreArtistRequest $request)
    {
        return new ArtistResource(
            $this->model->create(
                array_merge(
                    $request->input(),
                    [
                        'slug' => $request->input('name')
                    ]
                )
            )
        );
    }
}
