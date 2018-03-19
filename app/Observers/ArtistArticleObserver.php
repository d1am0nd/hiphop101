<?php

namespace App\Observers;

use Auth;
use App\Models\Artists\ArtistArticle;

class ArtistArticleObserver
{
    public function created(ArtistArticle $artist)
    {
        // Add details
        $artist->addDetails();
    }
}
