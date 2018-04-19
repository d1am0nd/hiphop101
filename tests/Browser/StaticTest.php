<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\{
    Home,
    About,
    HowToWrite,
};

class StaticTest extends DuskTestCase
{
    public function testStatic()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new Home);
            $browser->visit(new About);
            $browser->visit(new HowToWrite);
        });
    }
}
