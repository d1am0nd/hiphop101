<?php

namespace Tests\Feature\Api\Auth\Traits;

use App\Models\Users\User;

trait WithSetup
{
    public function baseUrl()
    {
        return '/api/auth';
    }

    public function registerUrl()
    {
        return $this->baseUrl() . '/register';
    }

    public function loginUrl()
    {
        return $this->baseUrl() . '/login';
    }

    public function logoutUrl()
    {
        return $this->baseUrl() . '/logout';
    }

    public function user()
    {
        return app(User::class);
    }

    public function getTable()
    {
        return $this->user()->getTable();
    }
}
