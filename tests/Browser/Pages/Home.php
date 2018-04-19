<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

use Tests\Browser\Components\ArticleList;
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
            ->assertSee(env('APP_NAME'))
            ->assertSee('Popular articles')
            ->assertSee('Home');
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

    /**
     * Get the element shortcuts for the page.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@articleList' => new ArticleList,
        ];
    }
}
