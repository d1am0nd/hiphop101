<?php

namespace Tests\Browser;

use App\Models\Artists\{
    Artist,
    ArtistArticle
};
use App\Models\Users\User;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use Tests\Browser\Pages\{
    Home,
    Artist as ArtistPage,
};
use Tests\Browser\Components\ArticleList;

class PagesTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * A Dusk test example.
     *
     * @return void
     */
    public function testWithOneArticle()
    {
        $artist = factory(Artist::class)->create();
        $activeArticle = factory(ArtistArticle::class)->create([
            'active' => true,
        ]);
        $inactiveArticle = factory(ArtistArticle::class)->create([
            'active' => false
        ]);

        $this->browse(function (Browser $browser) use (
            $activeArticle,
            $inactiveArticle,
            $artist
        ) {
            // Home page
            $browser->visit(new Home)
                ->seeArticle($activeArticle)
                ->dontSeeArticle($inactiveArticle);

            // Artist page
            $browser->visit(new ArtistPage($artist))
                ->seeArticle($activeArticle)
                ->dontSeeArticle($inactiveArticle);

        });
    }

    public function testWithThreePages()
    {
        $artist = factory(Artist::class)->create();
        $activeArticles = factory(
            ArtistArticle::class, (config('defaults.pagination.per_page') * 2) + 1
        )->create(['active' => true]);
        $inactiveArticles = factory(
            ArtistArticle::class, 5
        )->create(['active' => false]);

        $this->browse(function (Browser $browser) use (
            $artist,
            $activeArticles,
            $inactiveArticles
        ) {
            $browser->visit(new Home)
                ->hasNextPageButton()
                ->doesntHavePrevPageButton()
                ->goToNextPage()

                ->hasNextPageButton()
                ->hasPrevPageButton()
                ->goToNextPage()

                ->hasPrevPageButton()
                ->doesntHaveNextPageButton()
                ->goToPrevPage()

                ->hasNextPageButton()
                ->hasPrevPageButton();
        });
    }

    public function testLoginAndLogout()
    {
        $password = 'password';
        $user = factory(User::class)->create([
            'name' => 'Some username',
            'password' => \Hash::make($password),
        ]);

        $this->browse(function (Browser $browser) use ($user, $password) {
            $browser->visit(new Home)
                ->clickLink('Login')
                ->type('email', $user->email)
                ->type('password', $password)
                ->press('Submit')
                ->pause(200)
                ->assertSee(strtoupper($user->name))
                ->clickLink('Logout')
                ->assertDontSee(strtoupper($user->name));
        });
    }

    public function testRegister()
    {
        $username = 'Some username';
        $password = 'password';

        $this->browse(function (Browser $browser) use ($username, $password) {
            $browser->visit(new Home)
                ->clickLink('Register')
                ->type('email', 'someemail@email.com')
                ->type('name', 'Some username')
                ->type('password', $password)
                ->type('password_confirmation', $password)
                ->press('Submit')
                ->pause(200)
                ->assertSee(strtoupper($username));
        });
    }
}
