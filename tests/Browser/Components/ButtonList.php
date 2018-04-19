<?php

namespace Tests\Browser\Components;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Component as BaseComponent;

class ButtonList extends BaseComponent
{
    /**
     * Get the root selector for the component.
     *
     * @return string
     */
    public function selector()
    {
        return 'ul.button-list';
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

    public function hasText(Browser $browser, string $text)
    {
        $browser->assertSee($text);
    }

    public function doesntHaveText(Browser $browser, string $text)
    {
        $browser->assertDontSee($text);
    }

    public function clickButton(Browser $browser, string $text)
    {
        $browser->clickLink($text);
    }

    /**
     * Get the element shortcuts for the component.
     *
     * @return array
     */
    public function elements()

    {
        return [
            '@button' => 'li > a',
        ];
    }
}
