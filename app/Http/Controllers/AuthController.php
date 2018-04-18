<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Models\Users\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\LogoutRequest;
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

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->input();
        $data['password'] = $this->hash->make($data['password']);

        $user = $this->user->create($data);

        $token = $this->auth->attempt($request->only([
            'name', 'password',
        ]));
        return response()->json([
            'data' => [
                'user'  => $user,
                'token' => $this->tokenArray($token),
            ],
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $username = $request->input('email');
        $attempt = filter_var($username, FILTER_VALIDATE_EMAIL) ?
            'email' : 'name';

        if (! $token = $this->auth->attempt([
            $attempt => $username,
            'password' => $request->input('password'),
        ])) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'data' => [
                'user'  => $this->auth->user(),
                'token' => $this->tokenArray($token),
            ],
        ]);
    }

    public function logout(LogoutRequest $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'status' => 'success',
            ],
        ]);
    }

    public function refreshToken(Request $request): JsonResponse
    {
        return response()->json([
            'data' => [
                'user'  => $this->auth->user(),
                'token' => $this->tokenArray(auth()->refresh()),
            ],
        ]);
    }


    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return array
     */
    protected function tokenArray(string $token): array
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
