<?php

namespace Tests\Feature\Api\UserArticle;

use Tests\TestCase;
use Tests\Traits\AdditionalFakes;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Users\User;
use App\Models\Artists\ArtistArticle;

class PatchTest extends TestCase
{
    use RefreshDatabase,
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

        $res = $this
            ->actingAs($user)
            ->json(
                'PATCH',
                $this->articleUrl($article),
                $newAttributes = [
                    'title' => $this->faker()->name,
                    'content' => $this->minTextLength(800),
                    'active' => 1,
                ]
            );

        $res
            ->assertStatus(200)
            ->assertSee('1');

        $this->assertDatabaseHas(
            $this->getTable(),
            $newAttributes
        );
    }

    /** @test */
    function should_not_be_able_to_patch_someone_elses_article()
    {
        $article = factory(ArtistArticle::class)->create([
            'user_id' => factory(User::class)->create()->id,
        ]);

        $res = $this
            ->actingAs(factory(User::class)->create())
            ->json(
                'PATCH',
                $this->articleUrl($article),
                $newAttributes = [
                    'title' => $this->faker()->title,
                    'content' => $this->minTextLength(800),
                ]
            );

        $res
            ->assertStatus(404);

        $this->assertDatabaseMissing(
            $this->getTable(),
            $newAttributes
        );
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
            ->json(
                'PATCH',
                $this->articleUrl($article),
                $newAttributes = [
                    'title' => $this->faker()->title,
                    'content' => $this->minTextLength(800),
                    'active' => 0,
                ]
            );

        $res
            ->assertStatus(404);

        $this->assertDatabaseMissing(
            $this->getTable(),
            $newAttributes
        );
    }
}
