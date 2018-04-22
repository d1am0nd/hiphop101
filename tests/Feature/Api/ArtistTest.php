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
            ->assertSee($artist->name)
            ->assertSee($artist->slug)
            ->assertSee(json_encode($artist->description));
    }

    public function testGetArtistsMultiplePages()
    {
        $perPage = config('defaults.pagination.per_page');
        $pages = 2;

        factory(Artist::class, $perPage * $pages)->create();

        $res = $this->json('GET', '/api/artists');

        $res
            ->assertJson([
                'meta' => [
                    'current_page' => 1,
                    'from' => 1,
                    'to' => $perPage,
                    'last_page' => $pages,
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
                'data' => [
                    'name' => $artist->name,
                    'slug' => $artist->slug,
                    'description' => $artist->description,
                    'wikipedia_url' => $artist->wikipedia_url,
                ],
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

        $res->assertStatus(422);

        $this->assertObjectHasAttribute('name', $res->getData()->errors);
        $this->assertObjectHasAttribute('description', $res->getData()->errors);
    }

    public function testInvalidWikipediaUrl()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', '/api/artists', [
                'wikipedia_url' => 'http://virus.com',
            ]);

        $res->assertStatus(422);

        $this->assertObjectHasAttribute('wikipedia_url', $res->getData()->errors);
    }
}
