<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

use App\Models\Artists\ArtistArticle;

class ArticleList extends BaseComponent
{
    /**
     * Get the root selector for the component.
     *
     * @return string
     */
    public function selector()
    {
        return 'ul.article-list';
    }

    /**
     * Assert that the browser page contains the component.
     *
     * @param  Browser  $browser
     * @return void
     */
    public function assert(Browser $browser)
    {
        $browser->assertVisible($this->selector());
    }

    public function hasArticle(Browser $browser, ArtistArticle $article)
    {
        $browser->assertSeeIn('@article', $article->title);
    }

    public function doesntHaveArticle(Browser $browser, ArtistArticle $article)
    {
        $browser->assertDontSeeIn('@article', $article->title);
    }

    /**
     * Get the element shortcuts for the component.
     *
     * @return array
     */
    public function elements()
    {
        return [
            '@article' => 'li > div.article-wrapper',
        ];
    }
}
