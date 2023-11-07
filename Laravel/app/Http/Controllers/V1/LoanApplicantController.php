<?php
namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Requests\V1\LoanApplicantRequest;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\LoanApplicant;
use Auth;
use App\Models\User;use App\Models\LoanType;

class LoanApplicantController extends ApiController
{
    public function index()
    {
        try{
            $loan_applicants  = LoanApplicant::with('user','loan type')->paginate(20);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'LoanApplicant lists',
                'data' =>  $loan_applicants,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(LoanApplicantRequest $request)
    {
        try{            
            $loan_applicant = new LoanApplicant;
            $loan_applicant->name  =  $request->name;
			$loan_applicant->email  =  $request->email;
			$loan_applicant->phone  =  $request->phone;
			$loan_applicant->amount  =  $request->amount;
			$loan_applicant->user_id  =  $request->user_id;
			$loan_applicant->loan_type_id  =  $request->loan_type_id;
            $loan_applicant->save();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save LoanApplicant',
                'data' =>  $loan_applicant,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $loan_applicant = LoanApplicant::find($id);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show LoanApplicant',
                'data' =>  $loan_applicant,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }


    public function update(LoanApplicantRequest $request)
    {
        try{
            $loan_applicant =  LoanApplicant::find($request->id);
            $loan_applicant->name  =  $request->name;
			$loan_applicant->email  =  $request->email;
			$loan_applicant->phone  =  $request->phone;
			$loan_applicant->amount  =  $request->amount;
			$loan_applicant->user_id  =  $request->user_id;
			$loan_applicant->loan_type_id  =  $request->loan_type_id;
            $loan_applicant->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update LoanApplicant',
                'data' =>  $loan_applicant,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $loan_applicant = LoanApplicant::find($id)->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete LoanApplicant',
                'data' =>  $loan_applicant,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    
	public function status(Request $request){
		$loan_applicant = LoanApplicant::find($request->id);
		$loan_applicant->status = $request->status == 'true' ? true : false;
		$loan_applicant->save();
		return $loan_applicant;
	}


}
