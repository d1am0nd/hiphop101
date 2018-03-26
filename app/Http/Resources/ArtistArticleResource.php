<?php

namespace App\Http\Resources;

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
            'content' => $this->content,
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
