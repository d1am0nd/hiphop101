<?php

use Faker\Generator as Faker;
use App\Models\Users\User;
use App\Models\Artists\Artist;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\Artists\ArtistArticle::class, function (Faker $faker) {
    $title = $faker->unique()->name;
    $user = User::inRandomOrder()->first();
    if ($user === null) {
        $user = factory(User::class)->create();
    }
    $artist = Artist::inRandomOrder()->first();
    if ($artist === null) {
        $artist = factory(Artist::class)->create();
    }
    return [
        'active' => 1,
        'prefix' => substr(md5($user->id), 0, 6),
        'title' => $title,
        'slug' => str_slug($title),
        'description' => $faker->text,
        'content' => $faker->paragraphs(rand(5,10), true),
        'user_id' => $user->id,
        'artist_id' => $artist->id,
     ];
});
