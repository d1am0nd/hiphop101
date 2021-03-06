<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

use Tests\Browser\Components\{
    ArticleList,
    ButtonList,
};
use App\Models\Artists\{
    ArtistArticle,
};

class Home extends BasePage
{
    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/';
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser
            ->assertPathIs($this->url())
            ->waitFor('h1')
            ->assertSee(env('APP_NAME'))
            ->assertSee('Popular articles')
            ->assertSee('Home');
    }

    public function hasNextPageButton(Browser $browser)
    {
        $browser->within(new ButtonList, function (Browser $browser) {
            $browser->hasText('Next page');
        });
    }

    public function hasPrevPageButton(Browser $browser)
    {
        $browser->within(new ButtonList, function (Browser $browser) {
            $browser->hasText('Prev page');
        });
    }

    public function doesntHavePrevPageButton(Browser $browser)
    {
        $browser->within(new ButtonList, function (Browser $browser) {
            $browser->doesntHaveText('Prev page');
        });
    }

    public function doesntHaveNextPageButton(Browser $browser)
    {
        $browser->within(new ButtonList, function (Browser $browser) {
            $browser->doesntHaveText('Next page');
        });
    }

    public function seeArticle(Browser $browser, ArtistArticle $article)
    {
        $browser->within(new ArticleList, function (Browser $browser) use ($article) {
            $browser->hasArticle($article);
        });
    }

    public function dontSeeArticle(Browser $browser, ArtistArticle $article)
    {
        $browser->within(new ArticleList, function (Browser $browser) use ($article) {
            $browser->doesntHaveArticle($article);
        });
    }

    public function goToNextPage(Browser $browser)
    {
        $browser->within(new ButtonList, function (Browser $browser) {
            $browser->clickButton('Next page');
        });
    }

    public function goToPrevPage(Browser $browser)
    {
        $browser->within(new ButtonList, function (Browser $browser) {
            $browser->clickButton('Prev page');
        });
    }

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@articleList' => new ArticleList,
            '@buttonList' => new ButtonList,
        ];
    }
}
