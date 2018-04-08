<?php

namespace App\Observers;

use App\Models\Artists\Artist;

class ArtistObserver
{
    public function created(Artist $artist)
    {
        // Add details
        $artist->addDetails();
    }
}
