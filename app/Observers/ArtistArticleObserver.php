<?php

namespace App\Observers;

use App\Models\Artists\ArtistArticle;

class ArtistArticleObserver
{
    public function created(ArtistArticle $artist)
    {
        if (auth()->check()) {
            // Add details
            $artist->addDetails();
            // Autolike
            $artist->like(auth()->id());
        }
    }
}
