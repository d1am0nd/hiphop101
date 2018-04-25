<?php

namespace Tests\Feature\Api\ArtistArticle;

use Tests\TestCase;
use Tests\Traits\{
    AdditionalFakes,
    AdditionalAsserts,
};
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Artists\ArtistArticle;

class IndexTest extends TestCase
{

    use DatabaseTransactions,
        WithFaker,
        AdditionalFakes,
        Traits\WithSetup,
        AdditionalAsserts;

    public function testGetArtistArticlesStructure()
    {
        $article = factory(ArtistArticle::class)->create([
            'artist_id' => $this->artist->id,
        ]);

        $res = $this->json('GET', $this->baseUrl());

        $res
            ->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'meta',
                'parent',
            ])
            ->assertJsonFragment([
                'data' => [
                    array_merge(
                        $article->only([
                            'active',
                            'title',
                            'slug',
                            'prefix',
                            'updated_at',
                            'content',
                        ]),
                        [
                            'user' => $article->user->only([
                                'name',
                            ]),
                            'likes_count' => 0,
                            'artist' => $this->artist->only([
                                'name',
                                'slug',
                                'description',
                                'wikipedia_url',
                            ]),
                        ]
                    )
                ],
            ])
            ->assertJsonFragment([
                'parent' => $this->artist->only(
                    ['name', 'slug', 'description', 'wikipedia_url']
                )
            ]);
    }

    public function testGetArtistArticlesMultiplePages()
    {
        $perPage = config('defaults.pagination.per_page');
        $pages = 2;

        // Active ones
        factory(ArtistArticle::class, $perPage * $pages)->create([
            'active' => 1
        ]);

        // Inactive, shouldn't be seen
        factory(ArtistArticle::class, 5)->create(['active' => 0]);

        $res = $this->json('GET', $this->baseUrl());

        $res
            ->assertJsonFragment([
                'meta' => [
                    'current_page' => 1,
                    'from' => 1,
                    'last_page' => $pages,
                    'path' => url($this->baseUrl()),
                    'to' => $perPage,
                    'per_page' => $perPage,
                    'total' => $perPage * $pages,
                ],
            ]);
        $this->assertDataCount($perPage, $res);
    }
}
