<?php

namespace App\Http\Controllers\API\Frontend;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LoanType;
use App\Http\Requests\LoanApplicationRequest;
use App\Models\LoanApplication;

class LoanController extends ApiController
{

    public function loanType(Request $request){
        try{

            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = LoanType::where('status', true);

            if (isset($request->search)) {
                $qry->whereLike('name', $request->search);
            }

            if ($request->order_by == 'asc' || $request->order_by == 'desc') {
                $qry->orderBy('name', $request->order_by);
            }elseif($request->order_by == 'oldest'){
                $qry->orderBy('id', 'asc');
            }else{
                $qry->orderBy('id', 'desc');
            }

            $loan_type = $qry->paginate($per_page);

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan type lists',
                'data' =>  $loan_type,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }


    public function loanApply(LoanApplicationRequest $request)
    {
        try{

            $loan_type = LoanType::where('slug', $request->loan_type)->first();


            $loan_application = new LoanApplication;
            $loan_application->name  =  $request->name;
            $loan_application->email  =  $request->email;
            $loan_application->phone  =  $request->phone;
            $loan_application->amount  =  $request->amount;
            $loan_application->loan_type_id  =  $loan_type != null ? $loan_type->id : 1;
            $loan_application->referral  =  $request->referral;
            $loan_application->hidden_referral  =  $request->hidden_referral;
            $loan_application->user_id  = 1;
            $loan_application->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Your loan has applied',
                'data' =>  $loan_application,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
}
