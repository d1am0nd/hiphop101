<?php

namespace Tests\Feature\Api\ArtistArticle;

use Tests\TestCase;
use Tests\Traits\AdditionalFakes;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Artists\ArtistArticle;

class ShowTest extends TestCase
{

    use DatabaseTransactions, WithFaker, AdditionalFakes, Traits\WithSetup;

    /** @test */
    function should_successfully_get_an_artist_article()
    {
        $article = factory(ArtistArticle::class)->create(['active' => 1]);
        $res = $this->json('GET', $this->articleUrl($article));

        $res
            ->assertStatus(200)
            ->assertExactJson([
                'data' => array_merge(
                    $article->only([
                        'active',
                        'title',
                        'slug',
                        'prefix',
                        'content',
                        'updated_at',
                    ]),
                    [
                        'likes_count' => 0,
                        'user' => [
                            'name' => $article->user->name,
                        ]
                    ]
                ),
                'parent' => $this->artist->only([
                    'name', 'slug', 'description', 'wikipedia_url'
                ])
            ]);
    }

    /** @test */
    function should_get_404_on_nonexistant_article()
    {
        $res = $this->json('GET', $this->articleUrl('some-prefix', 'some-slug'));
        $res
            ->assertStatus(404);
    }
}
