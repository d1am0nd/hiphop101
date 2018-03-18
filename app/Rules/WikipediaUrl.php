<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class WikipediaUrl implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $re = '/(https?:\/\/(.+?\.)?wikipedia\.org(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&\'\(\)\*\+,;\=]*)?)/';
        return preg_match($re, $value) === 1;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Invalid Wikipedia URL.';
    }
}
