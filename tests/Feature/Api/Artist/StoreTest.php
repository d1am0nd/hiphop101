<?php

namespace Tests\Feature\Api\Artist;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\Artist;

class StoreTest extends TestCase
{
    use DatabaseTransactions, WithFaker, Traits\WithSetup;

    /** @test */
    function should_successfully_create_an_artist()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl(), [
                'name' => $name = 'Danny Brown',
                'description' => 'Ut nihil accusantium est maxime. Sed quam voluptatem est doloremque consectetur. Nisi officia dolores sapiente doloremque laborum qui accusantium. At quia ut voluptas enim. Aperiam eligendi quo porro voluptas natus minus. Repudiandae aut impedit excepturi voluptates sed atque eum. Quis fugit deserunt ipsum.',
            ]);

        $res
            ->assertStatus(201);
    }

    /** @test */
    function should_throw_forbidden_on_artist_creation()
    {
        $res = $this
            ->json('POST', $this->baseUrl());

        $res
            ->assertStatus(403);
    }

    /** @test */
    function should_throw_422_on_missing_data()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl());

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name', 'description'
            ]);
    }

    /** @test */
    function should_have_invalid_wikipedia_url_error()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl(), [
                'wikipedia_url' => 'http://virus.com',
            ]);

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'wikipedia_url'
            ]);
    }
}
