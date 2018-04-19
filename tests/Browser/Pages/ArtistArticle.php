<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page as BasePage;

use App\Models\Artists\{
    Artist,
    ArtistArticle as Article,
};

class ArtistArticle extends BasePage
{
    private $artist;
    private $article;

    public function __construct(Artist $artist, Article $article)
    {
        $this->artist = $artist;
        $this->article = $article;
    }

    /**
     * Get the URL for the page.
     *
     * @return string
     */
    public function url()
    {
        return '/artists/' . $this->artist->slug . '/' . $this->article->prefix . '/' .$this->article->slug;
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

    public function shouldSeeArticle(Browser $browser)
    {
        $browser
            ->assertSee($this->artist->name)
            ->assertSee($this->article->title);
    }

    public function should

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
