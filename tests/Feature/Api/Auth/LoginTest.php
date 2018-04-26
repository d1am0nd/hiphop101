<?php

namespace Tests\Feature\Api\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Users\User;

class LoginTest extends TestCase
{
    use RefreshDatabase, Traits\WithSetup;

    function assertLoginSuccess(string $withField)
    {
        $user = factory(User::class)->create([
            'password' => \Hash::make($pass = 'some password'),
        ]);

        $res = $this->json(
            'POST',
            $this->loginUrl(),
            [
                'email' => $user->$withField,
                'password' => $pass,
            ]
        );

        $res->assertStatus(200)
            ->assertJsonStructure($this->structure());
    }

    /** @test */
    function should_successfully_login_with_email()
    {
        $this->assertLoginSuccess('email');
    }

    /** @test */
    function should_succeffully_login_with_username()
    {
        $this->assertLoginSuccess('name');
    }

    /** @test */
    function should_have_missing_data_errors()
    {
        $res = $this->json('POST', $this->loginUrl());

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    /** @test */
    function should_fail_authentication_and_return_401()
    {
        $res = $this->json('POST', $this->loginUrl(), [
            'email' => 'doesnt exist',
            'password' => 'wrong as well',
        ]);

        $res->assertStatus(401);
    }
}
