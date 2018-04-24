<?php

namespace Tests\Feature\Api\UserArticle;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\ArtistArticle;

class DeleteTest extends TestCase
{
    use DatabaseTransactions,
        Traits\WithUrl;

    public function testDestroyArticleSuccess()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => false,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('DELETE', $this->articleUrl($article));

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
            ->json('DELETE', $this->articleUrl($article));

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
            ->json('DELETE', $this->articleUrl($article));

        $res
            ->assertStatus(404);
    }
}
