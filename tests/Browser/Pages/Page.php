<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Page as BasePage;

use Tests\Browser\Components\{
    Title,
    Description
};

abstract class Page extends BasePage
{
    /**
     * Get the global element shortcuts for the site.
     *
     * @return array
     */
    public static function siteElements()
    {
        return [
            '@element' => '#root',
            '@title' => new Title,
            '@description' => new Description,
        ];
    }
}
