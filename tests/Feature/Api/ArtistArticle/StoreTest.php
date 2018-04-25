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

    public function testPostArticleSuccess()
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

    public function testPostArticleForbidden()
    {
        $res = $this
            ->json('POST', $this->baseUrl(), []);

        $res
            ->assertStatus(403);
    }

    public function testPostArticleMissingData()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl());

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'content']);
    }
}
