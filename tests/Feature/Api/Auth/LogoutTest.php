<?php

namespace Tests\Feature\Api\Auth;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Users\User;

class LogoutTest extends TestCase
{

    use RefreshDatabase, Traits\WithSetup;

    /** @test */
    function should_invalidate_token_when_loggin_out()
    {
        $token = auth()->login(factory(User::class)->create());

        $res = $this
            ->withHeaders([
                'Authorization' => "Bearer $token",
            ])
            ->json('POST', $this->logoutUrl());

        $res->assertStatus(200);

        $this
            ->json('POST', $this->logoutUrl())
            ->assertStatus(403);
    }

    /** @test */
    function should_receive_403_if_not_logged_in()
    {
        $this->json('POST', $this->logoutUrl())
            ->assertStatus(403);
    }
}
