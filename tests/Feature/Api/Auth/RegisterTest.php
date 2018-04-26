<?php

namespace Tests\Feature\Api\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterTest extends TestCase
{
    use RefreshDatabase, Traits\WithSetup;

    function assertRegisterUserSuccess($atts)
    {
        $res = $this->json('POST', $this->registerUrl(),
            ($attributes = collect($atts))->toArray()
        );

        $res
            ->assertStatus(201)
            ->assertJsonStructure(['data'])
            ->assertJson([
                'data' => [
                    'user' => $attributes->only(['name'])->toArray(),
                    'token' => [
                        'token_type' => 'bearer',
                    ],
                ],
            ]);

        $this->assertDatabaseHas(
            $this->getTable(),
            $attributes->only('name')->toArray()
        );
    }

    /** @test */
    function should_succesfully_register_a_user_without_email()
    {
        $this->assertRegisterUserSuccess([
            'name' => 'some username',
            'password' => $pass = 'some password',
            'password_confirmation' => $pass,
        ]);
    }

    /** @test */
    function should_successfully_register_a_user_with_email()
    {
        $this->assertRegisterUserSuccess([
            'name' => 'some username',
            'email' => 'some@email.com',
            'password' => $pass = 'some password',
            'password_confirmation' => $pass,
        ]);
    }

    /** @test */
    function should_have_missing_data_errors()
    {
        $res = $this->json('POST', $this->registerUrl(), []);

        $res->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'password',
            ]);
    }

    /** @test */
    function should_have_invalid_email_error()
    {
        $res = $this->json('POST', $this->registerUrl(), [
            'name' => 'ok name',
            'password' => $pass = 'ok password',
            'password_confirmation' => $pass,
            'email' => 'not ok email',
        ]);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }
}
