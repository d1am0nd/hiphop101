<?php

namespace Tests\Feature\Api\ArtistArticle;

use DB;
use Tests\TestCase;
use Tests\Traits\AdditionalFakes;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\ArtistArticle;

class LikeTest extends TestCase
{

    use DatabaseTransactions, WithFaker, AdditionalFakes, Traits\WithUrl;

    public function testLikeArticleSuccess()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => true,
        ]);

        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('POST', $this->likeUrl($article));

        $res
            ->assertStatus(200)
            ->assertSee('true');
    }

    public function testLikeAlreadyLikedArticleFail()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => factory(User::class)->create()->id,
            'active' => true,
        ]);

        // Insert a like by another user manually
        DB::table('likes')->insert([
            'user_id' => ($user = factory(User::class)->create())->id,
            'likable_type' => ArtistArticle::class,
            'likable_id' => $article->id,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('POST', $this->likeUrl($article));

        $res
            ->assertStatus(200)
            ->assertSee('false');
    }

    public function testUnlikeArticleSuccess()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => factory(User::class)->create()->id,
            'active' => true,
        ]);

        // Insert a like by another user manually
        DB::table('likes')->insert([
            'user_id' => ($user = factory(User::class)->create())->id,
            'likable_type' => ArtistArticle::class,
            'likable_id' => $article->id,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('POST', $this->unlikeUrl($article));

        $res
            ->assertStatus(200)
            ->assertSee('true');
    }

    public function testUnlikeArticleThatIsntLikedFail()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => true,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('POST', $this->unlikeUrl($article));

        $res
            ->assertStatus(200)
            ->assertSee('false');
    }
}
