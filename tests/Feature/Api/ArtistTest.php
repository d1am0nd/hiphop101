<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\Artist;

class ArtistTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    public function testGetArtistsStructure()
    {
        $artist = factory(Artist::class)->create();
        $res = $this->json('GET', '/api/artists');
        $res
            ->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'meta',
            ])
            ->assertJsonFragment([
                'data' => [
                    $artist->only([
                        'name', 'slug', 'description', 'wikipedia_url',
                    ])
                ],
            ]);
    }

    public function testGetArtistsMultiplePages()
    {
        $perPage = config('defaults.pagination.per_page');
        $pages = 2;

        factory(Artist::class, $perPage * $pages)->create();

        $res = $this->json('GET', '/api/artists');

        $res
            ->assertJsonFragment([
                'meta' => [
                    'current_page' => 1,
                    'from' => 1,
                    'last_page' => $pages,
                    'path' => url('/api/artists'),
                    'to' => $perPage,
                    'per_page' => $perPage,
                    'total' => $perPage * $pages,
                ],
            ]);
        $this->assertCount($perPage, $res->getData()->data);
    }

    public function testGetArtistSuccess()
    {
        $artist = factory(Artist::class)->create();

        $res = $this->json('GET', '/api/artists/' . $artist->slug);

        $res
            ->assertExactJson([
                'data' => $artist->only([
                    'name', 'slug', 'description', 'wikipedia_url'
                ])
            ]);
    }

    public function testGetNonexistantArtist()
    {
        $res = $this->json('GET', '/api/artists/kr-neki');

        $res->assertStatus(404);
    }

    public function testPostArtistSuccess()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', '/api/artists', [
                'name' => $name = 'Danny Brown',
                'description' => 'Ut nihil accusantium est maxime. Sed quam voluptatem est doloremque consectetur. Nisi officia dolores sapiente doloremque laborum qui accusantium. At quia ut voluptas enim. Aperiam eligendi quo porro voluptas natus minus. Repudiandae aut impedit excepturi voluptates sed atque eum. Quis fugit deserunt ipsum.',
            ]);

        $res
            ->assertStatus(201);
    }

    public function testPostArtistForbidden()
    {
        $res = $this
            ->json('POST', '/api/artists');

        $res
            ->assertStatus(403);
    }

    public function testMissingData()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', '/api/artists');

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name', 'description'
            ]);
    }

    public function testInvalidWikipediaUrl()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', '/api/artists', [
                'wikipedia_url' => 'http://virus.com',
            ]);

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'wikipedia_url'
            ]);
    }
}
