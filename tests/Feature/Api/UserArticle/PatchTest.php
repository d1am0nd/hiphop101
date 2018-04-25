<?php

namespace Tests\Feature\Api\UserArticle;

use Tests\TestCase;
use Tests\Traits\AdditionalFakes;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Users\User;
use App\Models\Artists\ArtistArticle;

class PatchTest extends TestCase
{
    use DatabaseTransactions,
        WithFaker,
        AdditionalFakes,
        Traits\WithSetup;

    /** @test */
    function should_successfully_patch_an_article()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => false,
        ]);

        $newTitle = $this->faker()->name;
        $newContent = $this->minTextLength(800);

        $res = $this
            ->actingAs($user)
            ->json('PATCH', $this->articleUrl($article), [
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

    /** @test */
    function should_not_be_able_to_patch_someone_elses_article()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => factory(User::class)->create()->id,
        ]);

        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json('PATCH', $this->articleUrl($article), [
                'title' => $this->faker()->title,
                'content' => $this->minTextLength(800),
            ]);

        $res
            ->assertStatus(404);
    }

    /** @test */
    function should_not_be_able_to_deactive_an_article()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => ($user = factory(User::class)->create())->id,
            'active' => true,
        ]);

        $res = $this
            ->actingAs($user)
            ->json('PATCH', $this->articleUrl($article), [
                'title' => $this->faker()->title,
                'content' => $this->minTextLength(800),
                'active' => 0,
            ]);

        $res
            ->assertStatus(404);
    }
}
