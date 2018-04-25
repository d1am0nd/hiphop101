<?php

namespace Tests\Feature\Api\ArtistArticle\Traits;

use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;

trait WithSetup {

    public function setUp()
    {
        parent::setUp();

        $this->artist = factory(Artist::class)->create();
    }

    protected function baseUrl()
    {
        return '/api/artists/' . $this->artist->slug . '/articles';
    }

    // $artist mixed
    protected function articleUrl($param1, $param2 = null)
    {
        $prefix = $param1 instanceof ArtistArticle
            ? $param1->prefix
            : $param1;

        $slug = $param1 instanceof ArtistArticle
            ? $param1->slug
            : $param2;

        return $this->baseUrl() . '/' . $prefix . '/' . $slug;
    }

    protected function likeUrl($param1, $param2 = null)
    {
        return $this->articleUrl($param1, $param2) . '/like';
    }

    protected function unlikeUrl($param1, $param2 = null)
    {
        return $this->articleUrl($param1, $param2) . '/unlike';
    }
}
