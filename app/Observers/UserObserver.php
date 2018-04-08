<?php

namespace App\Observers;

use App\Models\Users\User;

class UserObserver
{
    public function created(User $user)
    {
        // Add details
        $user->addDetails();
    }
}
