<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Tests\Traits\AdditionalFakes;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\{
    Artist,
    ArtistArticle,
};

class ArtistArticleTest extends TestCase
{
    use DatabaseTransactions, WithFaker, AdditionalFakes;

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
        $article = factory(ArtistArticle::class)->create([
            'artist_id' => $this->artist->id,
        ]);
        $res = $this->json('GET', $this->baseUrl);

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

        $res = $this->json('GET', $this->baseUrl);

        $res
            ->assertJsonFragment([
                'meta' => [
                    'current_page' => 1,
                    'from' => 1,
                    'last_page' => $pages,
                    'path' => url($this->baseUrl),
                    'to' => $perPage,
                    'per_page' => $perPage,
                    'total' => $perPage * $pages,
                ],
            ]);
        $this->assertCount($perPage, $res->getData()->data);
    }

    public function testGetArtistArticleSuccess()
    {
        $article = factory(ArtistArticle::class)->create(['active' => 1]);
        $res = $this->json('GET', $this->baseUrl . $article->prefix . '/' . $article->slug);

        $res
            ->assertStatus(200)
            ->assertExactJson([
                'data' => array_merge(
                    $article->only([
                        'active',
                        'title',
                        'slug',
                        'prefix',
                        'content',
                        'updated_at',
                    ]),
                    [
                        'likes_count' => 0,
                        'user' => [
                            'name' => $article->user->name,
                        ]
                    ]
                ),
                'parent' => $this->artist->only([
                    'name', 'slug', 'description', 'wikipedia_url'
                ])
            ]);
    }

    public function testGetNonexistantArticle()
    {
        $res = $this->json('GET', $this->baseUrl . '/some-prefix/some-slug');
        $res
            ->assertStatus(404);
    }

    public function testPostArticleSuccess()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl, [
                'title' => $this->faker()->title,
                'content' => $this->minTextLength(800),
            ]);

        $res
            ->assertStatus(201);
    }

    public function testPostArticleForbidden()
    {
        $res = $this
            ->json('POST', $this->baseUrl, []);

        $res
            ->assertStatus(403);
    }

    public function testPostArticleMissingData()
    {
        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->baseUrl);

        $res
            ->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'content']);
    }

    public function testPatchArticleSuccess()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'artist_id' => $this->artist->id,
            'active' => false,
        ]);

        $newTitle = $this->faker()->name;
        $newContent = $this->minTextLength(800);

        $res = $this
            ->actingAs($user)
            ->json('PATCH', '/api/auth/articles/' . $article->id, [
                'title' => $newTitle,
                'content' => $newContent,
                'active' => 1,
            ]);

        $res
            ->assertStatus(200)
            ->assertSee('1');

        $article = $article->fresh();

        $this->assertEquals($newTitle, $article->title, 'Article didn\'t update title correctly');
        $this->assertEquals(str_slug($newTitle), $article->slug, 'Article didn\'t update slug correctly');
        $this->assertEquals($newContent, $article->content, 'Article didn\'t update content correctly');
    }

    public function testPatchArticleIncorrectUser()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => factory(User::class)->create()->id,
        ]);

        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('PATCH', '/api/auth/articles/' . $article->id, [
                'title' => $this->faker()->title,
                'content' => $this->minTextLength(800),
            ]);

        $res
            ->assertStatus(404);
    }

    public function testPatchDeactiveArticleFail()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => true,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('PATCH', '/api/auth/articles/' . $article->id, [
                'title' => $this->faker()->title,
                'content' => $this->minTextLength(800),
                'active' => 0,
            ]);

        $res
            ->assertStatus(404);
    }

    public function testDestroyArticleSuccess()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => false,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('DELETE', '/api/auth/articles/' . $article->id);

        $res
            ->assertStatus(200);

        $this->assertNull(ArtistArticle::find($article->id));
    }

    public function testDestroyActiveArticleFail()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => true,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('DELETE', '/api/auth/articles/' . $article->id);

        $res
            ->assertStatus(404);
    }

    public function testDestroyArticleUnauthorized()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => false,
        ]);

        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('DELETE', '/api/auth/articles/' . $article->id);

        $res
            ->assertStatus(404);
    }
}
