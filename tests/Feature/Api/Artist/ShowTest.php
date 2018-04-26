<?php

namespace Tests\Feature\Api\Artist;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Users\User;
use App\Models\Artists\Artist;

class ShowTest extends TestCase
{
    use RefreshDatabase, WithFaker, Traits\WithSetup;

    /** @test */
    function should_successfully_get_artist()
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

    /** @test */
    function should_get_404_on_nonexistant_artist()
    {
        $res = $this->json('GET', $this->artistUrl('nonexistant'));

        $res->assertStatus(404);
    }
}
