<?php

namespace Tests\Feature\Api\Artist;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use Tests\Traits\AdditionalAsserts;

use App\Models\Users\User;
use App\Models\Artists\Artist;

class IndexTest extends TestCase
{
    use DatabaseTransactions, WithFaker, AdditionalAsserts, Traits\WithSetup;

    /** @test */
    function should_have_correct_structure()
    {
        $artist = factory(Artist::class)->create();
        $res = $this->json('GET', $this->baseUrl());
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

    /** @test */
    function should_have_multiple_pages()
    {
        $perPage = config('defaults.pagination.per_page');
        $pages = 2;

        factory(Artist::class, $perPage * $pages)->create();

        $res = $this->json('GET', $this->baseUrl());

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

        $this->assertDataCount($perPage, $res);
    }
}
