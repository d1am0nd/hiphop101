<?php

namespace Tests\Feature\Api\Artist\Traits;

use App\Models\Artists\Artist;

trait WithSetup {

    protected function baseUrl()
    {
        return '/api/artists';
    }

    // $artist mixed
    protected function artistUrl($param)
    {
        $slug = $param instanceof Artist
            ? $param->slug : $param;
        return $this->baseUrl() . '/' . $slug;
    }
}
