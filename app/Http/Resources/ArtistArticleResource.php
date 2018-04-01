<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ArtistArticleResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'prefix' => $this->prefix,
            'description' => $this->description,
            'user' => $this->when(
                $this->user !== null,
                new UserResource($this->user)
            ),
            'content' => $this->when(
                $this->content !== null,
                $this->content
            ),
            'likes_count' => $this->when(
                $this->likes_count !== null,
                $this->likes_count
            ),
            'liked' => $this->when(
                auth()->check(),
                $this->myLike !== null
            )
        ];
    }
}
