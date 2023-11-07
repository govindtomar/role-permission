<?php

namespace App\Http\Controllers\API\Backend;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\LoanStatus;
use App\Http\Requests\Backend\LoanStatusRequest;
use DB;
use Auth;

class LoanStatusController extends ApiController
{
    public function index(Request $request)
    {
        try{

            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = LoanStatus::query();

            if (isset($request->search)) {
                $qry->whereLike(['name', 'slug'], $request->search);
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

            $loan_status = $qry->paginate($per_page);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan status lists',
                'data' =>  $loan_status,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function indexAll()
    {
        try{
            $loan_status = LoanStatus::all();  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan status lists',
                'data' =>  $loan_status,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(LoanStatusRequest $request)
    {
        try{
            $loan_status = new LoanStatus;
            $loan_status->name  =  $request->name;
            $loan_status->slug  =  $request->slug;
            $loan_status->color_code  =  $request->color_code;
            $loan_status->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save loan status',
                'data' =>  $loan_status,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $loan_status = LoanStatus::find($id);  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show loan status',
                'data' =>  $loan_status,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(LoanStatusRequest $request)
    {
        try{
            $loan_status =  LoanStatus::find($request->id);
            $loan_status->name  =  $request->name;
            $loan_status->slug  =  $request->slug;
            $loan_status->color_code  =  $request->color_code;
            $loan_status->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update loan status',
                'data' =>  $loan_status,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $loan_status = LoanStatus::find($id);
            $loan_status->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete loan status',
                'data' =>  $loan_status,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    
    public function status(Request $request){
        try{
            $loan_status = LoanStatus::find($request->id);
            $loan_status->status = $request->status;
            $loan_status->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Loan status changed',
                'data' =>  $loan_status,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

}
