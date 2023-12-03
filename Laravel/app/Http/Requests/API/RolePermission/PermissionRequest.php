<?php

namespace App\Http\Requests\API\RolePermission;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class PermissionRequest extends FormRequest
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
            'method'     => 'required',
            'api'     => 'required',
            'url'     => 'required',
            'permission_module_id'     => 'required',
        ];

        if (in_array($this->method(), ['PUT', 'PATCH'])) {
            $rules = [
                'id'     => 'required',
                'name'     => 'required',
                'method'     => 'required',
                'api'     => 'required',
                'url'     => 'required',
                'permission_module_id'     => 'required',
                'route_name'     => 'required',
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
