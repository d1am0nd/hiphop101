<?php

namespace Tests\Feature\Api\Popular\Traits;

use App\Models\Users\User;
use App\Models\Polymorphic\Like;
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
        $likes = [];
        for ($i = 0; $i < $likesCount; $i++) {
            $likes[] = [
                'user_id' => $userId,
            ];
        }

        // Insert them
        $article->likes()->createMany($likes);
    }

    // Takes array of articles, itearates through it with a foreach
    // and passes the key to `$likeCount`, which should return an int
    // Generates that many likes
    protected function addLikesToArticles(iterable $articles, Callable $likeCount, iterable $attributes = [])
    {
        // If user id is passed, take that
        // otherwise create a user
        $userId = isset($attributes['user_id'])
            ? $attributes['user_id']
            : factory(User::class)->create()->id;

        // Creates likes
        $likes = [];
        foreach ($articles as $key => $article) {
            // Creates amount of likes based on $likeCount return
            for ($i = 0; $i < $likeCount($key, $article); $i++) {
                $likes[] = [
                    'user_id' => $userId,
                    'likable_type' => ArtistArticle::class,
                    'likable_id' => $article->getKey(),
                ];
            }
        }
        Like::insert($likes);
    }
}
