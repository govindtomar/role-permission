<?php
namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Requests\V1\LoanTypeRequest;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\LoanType;
use DB;
use Auth;

class LoanTypeController extends ApiController
{
    public function index()
    {
        try{
            $loan_types = LoanType::paginate(20);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'LoanType lists',
                'data' =>  $loan_types,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(LoanTypeRequest $request)
    {
        try{
            $loan_type = new LoanType;
            $loan_type->name  =  $request->name;
			$loan_type->slug  =  $request->slug;
			$loan_type->detail  =  $request->detail;
			$loan_type->media  =  $request->media;
            $loan_type->save();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save LoanType',
                'data' =>  $loan_type,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $loan_type = LoanType::find($id);  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show LoanType',
                'data' =>  $loan_type,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(LoanTypeRequest $request)
    {
        try{
            $loan_type =  LoanType::find($request->id);
            $loan_type->name  =  $request->name;
			$loan_type->slug  =  $request->slug;
			$loan_type->detail  =  $request->detail;
			$loan_type->media  =  $request->media;
            $loan_type->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update LoanType',
                'data' =>  $loan_type,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $loan_type = LoanType::find($id)->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete LoanType',
                'data' =>  $loan_type,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    
	public function status(Request $request){
		$loan_type = LoanType::find($request->id);
		$loan_type->status = $request->status == 'true' ? true : false;
		$loan_type->save();
		return $loan_type;
	}



}
