<?php

namespace Tests\Feature\Api\ArtistArticle;

use Tests\TestCase;
use Tests\Traits\AdditionalFakes;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;

class StoreTest extends TestCase
{

    use DatabaseTransactions, WithFaker, AdditionalFakes, Traits\WithSetup;

    /** @test */
    function should_successfully_create_an_article()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl(), [
                'title' => $this->faker()->title,
                'content' => $this->minTextLength(800),
            ]);

        $res
            ->assertStatus(201);
    }

    /** @test */
    function should_get_403_when_not_logged_in()
    {
        $res = $this
            ->json('POST', $this->baseUrl(), []);

        $res
            ->assertStatus(403);
    }

    /** @test */
    function should_get_422_and_missing_data_errors()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl());

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'content']);
    }
}
