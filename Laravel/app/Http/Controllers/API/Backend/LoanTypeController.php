<?php

namespace App\Http\Controllers\API\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\LoanType;
use App\Http\Requests\Backend\LoanTypeRequest;
use DB;
use Auth;

class LoanTypeController extends ApiController
{
    public function index(Request $request)
    {
        try{

            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = LoanType::query();

            if (isset($request->search)) {
                $qry->whereLike(['name', 'slug'], $request->search);
            }
            if (isset($request->type)) {
                $qry->where('status', $request->type);
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

    public function indexAll()
    {
        try{
            $loan_type = LoanType::all();  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan type lists',
                'data' =>  $loan_type,
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
            $loan_type->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save loan type',
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
                'message' => 'Show loan type',
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
            $loan_type->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update loan type',
                'data' =>  $loan_type,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $loan_type = LoanType::find($id);
            $loan_type->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete loan type',
                'data' =>  $loan_type,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    
    public function status(Request $request){
        try{
            $loan_type = LoanType::find($request->id);
            $loan_type->status = $request->status;
            $loan_type->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan type changed',
                'data' =>  $loan_type,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

}
