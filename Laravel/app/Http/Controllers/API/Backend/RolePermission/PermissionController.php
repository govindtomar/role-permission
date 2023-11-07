<?php

namespace App\Http\Controllers\API\Backend\RolePermission;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\PermissionModule;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\Permission;
use Validator;
use Route;


class PermissionController extends ApiController
{

    public function index(Request $request, $id){
        try{
            $per_page = $request->per_page ? $request->per_page : 10;
            $qry = Permission::where('permission_module_id', $id);
            if (isset($request->search)) {
                $qry->whereLike(['name', 'api', 'url'], $request->search);
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

            $permissions = $qry->paginate($per_page);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Permission lists',
                'data' =>  $permissions,
            ]);
        } catch (Exception $e) {
            return $this->responseWithError($e->getMessage());
        }
    }

    public function show(Request $request, $id){
        try{
            $permission = Permission::find($id);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show permission',
                'data' =>  $permission,
            ]);
        } catch (Exception $e) {
            return $this->responseWithError($e->getMessage());
        }
    }
    
    public function store(Request $request){
        try{
            $module = PermissionModule::find($request->permission_module_id);

            if($module){
                $permission = new Permission;
                $permission->name = $request->name;
                $permission->method = $request->method;
                $permission->api = $module->module_api . $request->api;;
                $permission->url = $request->url;
                $permission->permission_module_id = $module->id;
                $permission->route_name = $module->module_api .'.'. $request->api;
                $permission->save();

                $roles = Role::all();
                foreach ($roles as $key => $role) {
                    $role_permission = RolePermission::where('role_id', $role->id)
                        ->where('permission_id', $permission->id)->first();
                    if($role_permission == null){
                        $role_permission = new RolePermission;
                        $role_permission->role_id = $role->id;
                        $role_permission->permission_id = $permission->id;
                        $role_permission->route_name = $permission->route_name;
                        $role_permission->status = 0;
                        $role_permission->save();
                    }
                }                
            }else{
                return $this->response([
                    'status' => $this->getStatusCode(),
                    'message' => 'Permission module not found',
                ]);
            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Permission save successfully',
                'data' =>  $permission,
            ]);
        } catch (Exception $e) {
            return $this->responseWithError($e->getMessage());
        }
    }

    public function update(Request $request){
        try{
            $module = PermissionModule::find($request->permission_module_id);

            if($module){
                $permission =  Permission::find($request->id);
                $permission->name = $request->name;
                $permission->method = $request->method;
                $permission->api = $request->api;
                $permission->url = $request->url;
                $permission->permission_module_id = $module->id;
                $permission->route_name = $request->route_name;
                $permission->save();

                $roles = Role::all();
                foreach ($roles as $key => $role) {
                    $role_permission = RolePermission::where('role_id', $role->id)
                        ->where('permission_id', $permission->id)->first();
                    if($role_permission != null){
                        if($permission->route_name != $role_permission->route_name){
                            $role_permission->route_name = $permission->route_name;
                            $role_permission->save();
                        }
                    }
                }

            }else{
                return $this->response([
                    'status' => $this->getStatusCode(),
                    'message' => 'Permission module not found',
                ]);
            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Permission save successfully',
                'data' =>  $permission,
            ]);
        } catch (Exception $e) {
            return $this->responseWithError($e->getMessage());
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
                return $this->responseValidationError('Fields Validation Failed.', $validator);
            }

            $permission = Permission::find($request->id);
            $permission->status = $request->status;
            $permission->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Permission update successfully',
                'data' =>  $permission,
            ]);
        } catch (Exception $e) {
            return $this->responseWithError($e->getMessage());
        }
    }

    public function delete(Request $request){
        try{

            $rules = array(
                'id' => ['required'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->responseValidationError('Fields Validation Failed.', $validator);
            }

            // $permission = Permission::find($request->id);
            // $rps = PermissionRoute::where('permission_id', $permission->id)->get();
            // foreach ($rps as $key => $rp) {
            //     RolePermission::where('permission_id', $rp->id)->delete();
            // }
            // PermissionRoute::where('permission_id', $permission->id)->delete();
            // $permission->delete();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Permission delete successfully',
                // 'data' =>  $permission,
            ]);
        } catch (Exception $e) {
            return $this->responseWithError($e->getMessage());
        }
    }
    
}