<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class LoanApplicantRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }


    public function rules()
    {
        return [
            'name'  =>  'required',
			'email'  =>  'required',
			'phone'  =>  'required',
			'amount'  =>  'required',
			'user_id'  =>  'required',
			'loan_type_id'  =>  'required',
			'status'  =>  '',
        ];
    }

    public function failedValidation(Validator $validator){
       throw new HttpResponseException(response()->json([
         'success'   => false,
         'message'   => 'Validation errors',
         'data'      => $validator->errors()
       ]));
    }

}
