<?php

namespace Tests\Feature\Api\UserArticle\Traits;

use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;

trait WithSetup
{

    public function setUp()
    {
        parent::setUp();
    }

    protected function baseUrl()
    {
        return '/api/auth/articles';
    }

    // $artist mixed
    protected function articleUrl($param1)
    {
        $id = $param1 instanceof ArtistArticle
            ? $param1->id
            : $param1;

        return $this->baseUrl() . '/' . $id;
    }
}
