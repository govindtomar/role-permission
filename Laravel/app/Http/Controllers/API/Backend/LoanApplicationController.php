<?php

namespace App\Http\Controllers\API\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\LoanApplication;
use App\Models\LoanStatus;
use App\Models\LoanType;
use App\Http\Requests\Backend\LoanApplicationRequest;
use DB;
use Auth;

class LoanApplicationController extends ApiController
{
    public function index(Request $request)
    {
        try{

            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = LoanApplication::with('loan_type', 'loan_status');

            if (isset($request->search)) {
                $qry->whereLike(['name', 'email', 'phone'], $request->search);
            }
            if (isset($request->status)) {
                $qry->where('status', $request->status);
            }
            if ($request->order_by == 'asc' || $request->order_by == 'desc') {
                $qry->orderBy('name', $request->order_by);
            }elseif($request->order_by == 'oldest'){
                $qry->orderBy('id', 'asc');
            }else{
                $qry->orderBy('id', 'desc');
            }

            $loan_application = $qry->paginate($per_page);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan application lists',
                'data' =>  $loan_application,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function indexAll()
    {
        try{
            $loan_application = LoanApplication::all();  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan application lists',
                'data' =>  $loan_application,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(LoanApplicationRequest $request)
    {
        try{

            $loan_application = new LoanApplication;
            $loan_application->name  =  $request->name;
            $loan_application->email  =  $request->email;
            $loan_application->phone  =  $request->phone;
            $loan_application->amount  =  $request->amount;
            $loan_application->loan_type_id  =  $request->loan_type;
            $loan_application->referral  =  $request->referral;
            $loan_application->hidden_referral  =  $request->hidden_referral;
            $loan_application->updated_by  =  Auth::id();
            $loan_application->loan_status_id  =  $request->loan_status;
            $loan_application->description  =  $request->description;
            $loan_application->save();

            $loan_application->users()->attach(Auth::id(), 
            [
                "create"    =>  1,
                "read"      =>  1,
                "Update"    =>  1,
                "delete"    =>  1
            ]);

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save loan application',
                'data' =>  $loan_application,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $loan_application = LoanApplication::with('loan_type', 'loan_status', 'users')
                ->find($id);  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show loan application',
                'data' =>  $loan_application,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(LoanApplicationRequest $request)
    {
        try{

            $loan_application = LoanApplication::find($request->id);
            $loan_application->name  =  $request->name;
            $loan_application->email  =  $request->email;
            $loan_application->phone  =  $request->phone;
            $loan_application->amount  =  $request->amount;
            $loan_application->loan_type_id  =  $request->loan_type;
            $loan_application->referral  =  $request->referral;
            $loan_application->hidden_referral  =  $request->hidden_referral;
            $loan_application->updated_by  =  Auth::id();
            $loan_application->loan_status_id  =  $request->loan_status;
            $loan_application->description  =  $request->description;
            $loan_application->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update loan application',
                'data' =>  $loan_application,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $loan_application = LoanApplication::find($id);
            $loan_application->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete loan application',
                'data' =>  $loan_application,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    
    public function status(Request $request){
        try{
            $loan_application = LoanApplication::find($request->id);
            $loan_application->status = $request->status;
            $loan_application->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan application changed',
                'data' =>  $loan_application,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

}
