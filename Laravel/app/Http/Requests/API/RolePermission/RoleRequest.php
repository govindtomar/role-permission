<?php

namespace App\Http\Requests\API\RolePermission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class RoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'name'     => 'required',
            'slug'     => 'required'
        ];

        if (in_array($this->method(), ['PUT', 'PATCH'])) {
            $rules = [
                'id'    =>  'required',
                'name'  => 'required',
                'slug'  => 'required'
            ];
        }

        return $rules;

    }


    public function failedValidation(Validator $validator){
       throw new HttpResponseException(response()->json([
         'success'   => false,
         'message'   => 'Validation errors',
         'data'      => $validator->errors()
       ]));
    }
}
