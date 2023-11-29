<?php

namespace App\Http\Controllers\API\Backend\RolePermission;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\Permission;
use App\Models\User;
use Auth;
use Validator;


class RoleController extends ApiController
{

    public function index(Request $request){
        try{
            $per_page = $request->per_page ? $request->per_page : 10;

            $qry = Role::query();
            if($this->is_super_admin()){
                $qry->whereNull('user_id');
            }else{
                $qry->where('user_id', Auth::id());
            }
            if (isset($request->search)) {
                $qry->whereLike(['name', 'slug'], $request->search);
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

            $roles = $qry->where('id', '>', 1)->paginate($per_page);

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Role lists',
                'data' =>  $roles,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show(Request $request, $id){
        try{
            if ($request->by == 'slug') {
                $role = Role::where('slug', $id)->first();
            }else{
                $role = Role::find($id);
            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show role',
                'data' =>  $role,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(Request $request){
        try{
            $rules = array(
                'name' => ['required', 'string'],
                'slug' => ['required', 'string'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->respondValidationError('Fields Validation Failed.', $validator);
            }



            $role = new Role;
            $role->name = $request->name;
            if($this->is_super_admin()){
                $role->slug = $request->slug;
            }else{
                $role->slug = $request->slug .'-'. Auth::id();
                $role->user_id = Auth::id();
            }
            $role->save();

            $permissions = Permission::all();

            foreach ($permissions as $key => $permission) {
                $rp = new RolePermission;
                $rp->role_id = $role->id;
                $rp->permission_id = $permission->id;
                $rp->route_name = $permission->route_name;
                if($role->id == 1){
                    $rp->status = 1;
                }
                $rp->save();
            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Role save successfully',
                'data' =>  $role,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(Request $request){
        try{
        // return $request->all();
            $rules = array(
                'id' => ['required'],
                'name' => ['required', 'string'],
                'slug' => ['required', 'string'],
                // 'slug' => ['required', 'string'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->respondValidationError('Fields Validation Failed.', $validator);
            }

            $role = Role::find($request->id);
            $role->name = $request->name;
            $role->slug = $request->slug;
            $role->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Role update successfully',
                'data' =>  $role,
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

            $role = Role::find($request->id);
            $role->status = $request->status;
            $role->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Status changed successfully',
                'data' =>  $role,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function delete(Request $request, $id){
        try{
            $role = Role::find($id);
            $role->delete();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Role deleted successfully',
                'data' =>  $role,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    private function is_super_admin(){
        $user = User::with('roles')->find(Auth::id());
        $this->is_su = false;
        foreach ($user->roles as $key => $role) {
            if($role->id === 1){
                $this->is_su = true;
            }
        }
        return $this->is_su;
    }
}
