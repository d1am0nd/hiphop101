<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

use App\Models\Artists\{
    Artist as ArtistModel,
    ArtistArticle,
};

use Tests\Browser\Components\ArticleList;

class Artist extends BasePage
{
    private $artist;

    public function __construct(ArtistModel $artist)
    {
        $this->artist = $artist;
    }

    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/artists/' . $this->artist->slug;
    }

    /**
     * Assert that the browser is on the page.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertPathIs($this->url());
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
        ];
    }
}
