<?php

namespace Tests\Feature\Api\Popular;

use Tests\TestCase;
use Tests\Traits\AdditionalAsserts;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Artists\ArtistArticle;

class ArticlesTest extends TestCase
{

    use RefreshDatabase, Traits\WithSetup, AdditionalAsserts;

    /** @test */
    function should_be_ordered_by_likes_count()
    {
        $articles = factory(ArtistArticle::class, config('defaults.pagination.per_page') + 3)
            ->create([
                'active' => true,
            ]);

        $this->addLikesToArticles($articles, function ($key) {
            return $key;
        });

        $res = $this->json('GET', $this->articlesUrl());

        $res->assertStatus(200);

        $articles = $res->getData()->data;

        $this->assertDescOrder($articles, 'likes_count', 'slug');
    }
}
