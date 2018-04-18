<?php

namespace App\Http\Resources;

use App\Http\Resources\ArtistArticleResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ArtistArticleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return AnonymouseResourceCollection
     */
    public function toArray($request): AnonymousResourceCollection
    {
        return ArtistArticleResource::collection($this);
    }
}
