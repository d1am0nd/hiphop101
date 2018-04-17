<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\ArtistResource;
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
            'active' => $this->active,
            'title' => $this->title,
            'slug' => $this->slug,
            'prefix' => $this->prefix,
            // 'description' => $this->description,
            'updated_at' => $this->updated_at,
            'artist' => new ArtistResource($this->whenLoaded('artist')),
            'user' => new UserResource($this->whenLoaded('user')),
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
