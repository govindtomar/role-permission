<?php

namespace App\Http\Requests\Backend;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class LoanApplicationRequest extends FormRequest
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
        return [
            'name'  =>  'required',
            'email'  =>  'required',
            'phone'  =>  'required',
            'amount'  =>  'required',
            'loan_type'  =>  'required',
            'referral'  =>  'required',
            'hidden_referral'   =>  'required'
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
