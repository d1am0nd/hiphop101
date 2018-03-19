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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
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
        Route::get('{prefix}/{slug}', 'ArtistArticleController@show');
    });
});
