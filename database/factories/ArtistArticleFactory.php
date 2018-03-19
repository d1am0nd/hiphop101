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
    $uid = User::inRandomOrder()->first()->id;
    return [
        'active' => 1,
        'prefix' => substr(md5($uid), 0, 6),
        'title' => $title,
        'slug' => str_slug($title),
        'description' => $faker->text,
        'content' => $faker->paragraphs(rand(5,10), true),
        'user_id' => $uid,
        'artist_id' => Artist::inRandomOrder()->first()->id,
     ];
});
