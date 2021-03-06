<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreArtistArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            // 'description' => 'between:150,400',
            'content' => ['required', 'min:800'],
        ];
    }

    /*
    protected function getValidatorInstance(){
        $validator = parent::getValidatorInstance();

        $validator->sometimes('description', 'between:150,400', function ($input) {
            return $input->active == true;
        });

        $validator->sometimes('content', 'min:800', function ($input) {
            return $input->active == true;
        });

        return $validator;
    }
    */
}
