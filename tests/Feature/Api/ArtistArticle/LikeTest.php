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

    use DatabaseTransactions, WithFaker, AdditionalFakes, Traits\WithSetup;

    /** @test */
    function should_successfully_like_an_article()
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

    /** @test */
    function should_not_be_able_to_like_article_again()
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

    /** @test */
    function should_successfully_unlike_an_article()
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

    /** @test */
    function should_not_be_able_to_like_an_article()
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
