<?php

namespace App\Http\Resources;

use App\Http\Resources\ArtistResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserArticleResource extends JsonResource
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
            'id' => $this->id,
            'active' => $this->active,
            'title' => $this->title,
            'slug' => $this->slug,
            'prefix' => $this->prefix,
            'description' => $this->description,
            'content' => $this->content,
            'artist' => new ArtistResource($this->whenLoaded('artist')),
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}
