<?php

namespace Tests\Browser;

use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;

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

        $this->browse(function (Browser $browser) use(
            $activeArticle,
            $inactiveArticle,
            $artist) {

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
}
