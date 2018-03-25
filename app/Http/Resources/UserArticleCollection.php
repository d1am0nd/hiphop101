<?php

namespace App\Http\Resources;

use App\Http\Resources\UserArticleResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserArticleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return UserArticleResource::collection($this);
    }
}
