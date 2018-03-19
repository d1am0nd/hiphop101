<?php

namespace App\Providers;

use App\Models\Artists\Artist;
use App\Models\Artists\ArtistArticle;
use App\Observers\ArtistObserver;
use App\Observers\ArtistArticleObserver;
use Illuminate\Support\ServiceProvider;

class ModelEventServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Artist::observe(ArtistObserver::class);
        ArtistArticle::observe(ArtistArticleObserver::class);
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
