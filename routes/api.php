<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refreshToken');

    Route::group([
        'prefix' => 'articles',
        'middleware' => 'auth:api',
    ], function () {
        Route::get('/', 'UserArticleController@index');
        Route::get('{id}', 'UserArticleController@show');
        Route::patch('{id}', 'UserArticleController@update');
        Route::delete('{id}', 'UserArticleController@destroy');
    });
});

Route::group([
    'prefix' => 'popular',
], function () {
    Route::get('articles', 'PopularController@articles');
});

Route::group([
    'prefix' => 'artists',
], function () {
    Route::get('/', 'ArtistController@index');
    Route::post('/', 'ArtistController@store');
    Route::get('{artist}', 'ArtistController@show');

    Route::group([
        'prefix' => '{artist}/articles',
    ], function () {
        Route::get('/', 'ArtistArticleController@index');
        Route::post('/', 'ArtistArticleController@store');
        Route::get('{prefix}/{slug}', 'ArtistArticleController@show');

        Route::group([
            'middleware' => 'auth:api',
        ], function () {
            Route::post('{prefix}/{slug}/like', 'ArtistArticleController@like');
            Route::post('{prefix}/{slug}/unlike', 'ArtistArticleController@unlike');
        });
    });
});

Route::group([
    'prefix' => 'articles'
], function () {
    Route::get('/', 'ArticleController@index');
});
