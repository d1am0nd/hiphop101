<?php

namespace App\Http\Requests;

use Auth;
use App\Rules\WikipediaUrl;
use Illuminate\Foundation\Http\FormRequest;

class StoreArtistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'unique:artists'],
            'description' => ['required', 'between:150,400'],
            'wikipedia_url' => ['nullable', new WikipediaUrl]
        ];
    }
}
