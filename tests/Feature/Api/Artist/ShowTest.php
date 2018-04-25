<?php

namespace Tests\Feature\Api\Artist;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\Artist;

class ShowTest extends TestCase
{
    use DatabaseTransactions, WithFaker, Traits\WithSetup;

    public function testGetArtistSuccess()
    {
        $artist = factory(Artist::class)->create();

        $res = $this->json('GET', $this->artistUrl($artist));

        $res
            ->assertExactJson([
                'data' => $artist->only([
                    'name', 'slug', 'description', 'wikipedia_url'
                ])
            ]);
    }

    public function testGetNonexistantArtist()
    {
        $res = $this->json('GET', $this->artistUrl('nonexistant'));

        $res->assertStatus(404);
    }
}
