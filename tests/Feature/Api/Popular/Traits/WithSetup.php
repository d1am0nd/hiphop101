<?php

namespace Tests\Feature\Api\Popular\Traits;

use App\Models\Artists\ArtistArticle;

trait WithSetup
{
    protected function baseUrl()
    {
        return '/api/popular';
    }

    protected function articlesUrl()
    {
        return $this->baseUrl() . '/articles';
    }

    protected function artistsUrl()
    {
        return $this->baseUrl() . '/artists';
    }

    protected function addLikesToArticle(ArtistArticle $article, int $likesCount, array $attributes = [])
    {
        // If user id is passed, take that
        // otherwise create a user
        $userId = isset($attributes['user_id'])
            ? $attributes['user_id']
            : factory(User::class)->create()->id;

        // Create multiple likes array
        for ($i = 0; $i < $likesCount; $i++) {
            $likes[] = [
                'user_id' => $userId,
            ];
        }

        // Insert them
        $article->likes()->createMany($likes);
    }
}
