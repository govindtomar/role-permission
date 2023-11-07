<?php

namespace App\Http\Controllers\API\Backend\RolePermission;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\PermissionModule;
use Validator;


class PermissionModuleController extends ApiController
{

    public function index(Request $request){
        try{
            $per_page = $request->per_page ? $request->per_page : 10;
            
            $qry = PermissionModule::query();
            if (isset($request->search)) {
                $qry->whereLike(['name', 'module_api'], $request->search);
            }
            if (isset($request->status)) {
                $qry->whereLike('status', $request->status);
            }
            if ($request->order_by == 'asc' || $request->order_by == 'desc') {
                $qry->orderBy('name', $request->order_by);
            }elseif($request->order_by == 'oldest'){
                $qry->orderBy('id', 'asc');
            }else{
                $qry->orderBy('id', 'desc');
            }

            $permission_modules = $qry->paginate($per_page);

            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Permission Module lists',         
                'data' =>  $permission_modules,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show(Request $request, $id){
        try{

            $permission_module = PermissionModule::find($id);
        
            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Show permission module',         
                'data' =>  $permission_module,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
    
    public function store(Request $request){
        try{
            $rules = array(
                'name' => ['required', 'string'],
                'module_api' => ['required', 'string'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->respondValidationError('Fields Validation Failed.', $validator);
            }

            $permission_module = new PermissionModule;
            $permission_module->name = $request->name;
            $permission_module->module_api = $request->module_api;
            $permission_module->save();

            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Permission Module save successfully',         
                'data' =>  $permission_module,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(Request $request){
        try{
            $rules = array(
                'id' => ['required'],
                'name' => ['required', 'string'],
                'module_api' => ['required', 'string'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->respondValidationError('Fields Validation Failed.', $validator);
            }

            $permission_module = PermissionModule::find($request->id);
            $permission_module->name = $request->name;
            $permission_module->module_api = $request->module_api;
            $permission_module->save();



            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Permission Module update successfully',         
                'data' =>  $permission_module,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }


    public function changeStatus(Request $request){
        try{
            $rules = array(
                'id' => ['required'],
                'status' => ['required']
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->respondValidationError('Fields Validation Failed.', $validator);
            }

            $permission_module = PermissionModule::find($request->id);
            $permission_module->status = $request->status;
            $permission_module->save();

            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Status changed successfully',         
                'data' =>  $permission_module,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function delete(Request $request, $id){
        try{
            $permission_module = PermissionModule::find($id);
            $permission_module->delete();

            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Permission Module deleted successfully',         
                'data' =>  $permission_module,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
