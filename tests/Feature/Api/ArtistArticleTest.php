<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Artists\{
    Artist,
    ArtistArticle,
};

class ArtistArticleTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    private $artist;

    private $baseUrl;

    public function setUp()
    {
        parent::setUp();

        $this->artist = factory(Artist::class)->create();
        $this->baseUrl = '/api/artists/' . $this->artist->slug . '/articles/';
    }

    public function testGetArtistArticlesStructure()
    {

        $res = $this->json('GET', $this->baseUrl);

        $res
            ->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'meta',
                'parent',
            ])
            ->assertJsonFragment([
                'parent' => $this->artist->only(
                    ['name', 'slug', 'description', 'wikipedia_url']
                )
            ]);
    }
}
