<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;

class AuthController extends Controller
{
    // User model
    protected $user;

    protected $hash;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->hash = app()->make('hash');
        $this->auth = app()->make('auth');
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->input();
        $data['password'] = $this->hash->make($data['password']);

        $user = $this->user->create($data);

        $token = $this->auth->attempt($request->only([
            'email', 'password',
        ]));

        return response()->json(array_merge([
            'user' => $user,
        ], [
            'token' => $this->tokenArray($token),
        ]));
    }

    public function login(LoginRequest $request)
    {
        if (! $token = $this->auth->attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return response()->json(array_merge([
            'user' => $this->auth->user(),
        ], [
            'token' => $this->tokenArray($token),
        ]));
    }


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return array
     */
    protected function tokenArray($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
