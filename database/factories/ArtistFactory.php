<?php

use Faker\Generator as Faker;

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

$factory->define(App\Models\Artists\Artist::class, function (Faker $faker) {
    $name = $faker->unique()->name;
    return [
        'name' => $name,
        'slug' => str_slug($name),
        'description' => $faker->paragraphs(2, true),
        'wikipedia_url' => $faker->url,
    ];
});
