<?php

namespace App\Http\Resources;

use App\Http\Resources\ArtistArticleResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArtistArticleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return ArtistArticleResource::collection($this);
    }
}
