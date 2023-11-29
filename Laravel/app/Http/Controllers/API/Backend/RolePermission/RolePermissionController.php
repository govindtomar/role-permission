<?php
namespace App\Http\Controllers\API\Backend\RolePermission;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\PermissionModule;
use App\Models\RolePermission;
use App\Models\Role;
use App\Models\User;
use Auth;

class RolePermissionController extends ApiController
{
    public function routes()
    {
        try{
            $user = User::with('roles')->find(Auth::id());
            $roles = [];
            foreach ($user->roles as $key => $role) {
                $roles[] = $role->id;
            }
            $permissions = RolePermission::with(['permission'])
                ->whereIn('role_id', $roles)->get();

            $permission = [];
            $in_arr = [];
            foreach ($permissions as $key => $per) {
                if ($per->status == 1) {
                    if(!in_array($per->permission->url, $in_arr)){
                        $in_arr[] = $per->permission->url;
                        $permission[] = $per->permission->url;
                    }
                }
            }

            return $permission;
            // return $this->respond([
            //     'status' => 'success',
            //     'status_code' => $this->getStatusCode(),
            //     'message' => 'Role routes',
            //     'data' =>  $permission,
            // ]);
        } catch (Exception $e) {
            return $this->respondWithError($e->getMessage());
        }
    }

    public function index($slug)
    {
        try{

            $data = [];

            if($this->is_super_admin()){
                $this->roles = [];
                $role = Role::where('slug', $slug)->first();
                $this->role_id = $role->id;
                $this->roles[] = $this->role_id;

                $user = User::with('roles')->find(Auth::id());
                foreach ($user->roles as $key => $role) {
                    $this->roles[] = $role->id;
                }

                $permissions  = PermissionModule::with(['permissions' => function($query){
                    $query->with(['role_permissions'  => function($query){
                        $query->whereIn('role_id', $this->roles);
                        $query->orderBy('id', 'desc');
                    }]);
                }])->get();

            }else{

                $this->roles = [];
                $user = User::with('roles')->find(Auth::id());
                foreach ($user->roles as $key => $role) {
                    $this->roles[] = $role->id;
                }

                $permissions  = PermissionModule::with(['permissions' => function($query){
                    $query->with(['role_permissions'  => function($query){
                        $query->where('status', 1);
                        $query->whereIn('role_id', $this->roles);
                    }]);
                }])->get();

                $this->module = [];
                $this->permission =[];
                $this->role_permission =[];
                foreach($permissions as $module){
                    foreach($module->permissions as $permission){
                        $data[] = $permission->role_permissions;
                        if($permission->role_permissions != null){
                            if(!in_array($module->id, $this->module)){
                                $this->module[] = $module->id;
                            }
                            if(!in_array($permission->route_name, $this->permission)){
                                $this->permission[] = $permission->route_name;
                            }
                        }
                    }
                }

                $this->roles = [];
                $role = Role::where('slug', $slug)->first();
                $this->role_id = $role->id;
                $this->roles[] = $this->role_id;

                $permissions  = PermissionModule::with(['permissions' => function($query){
                    $query->whereIn('route_name', $this->permission);
                    $query->with(['role_permissions'  => function($query){
                        $query->whereIn('role_id', $this->roles);
                        $query->orderBy('id', 'desc');
                    }]);
                }])->whereIn('id', $this->module)->get();

            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'permission lists',
                'data' =>  $permissions,
                'extra' => $this->roles
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }


    public function update(Request $request)
    {
        try{
            foreach ($request->permission as $id => $status) {
                $role_per = RolePermission::where('id', $id)->first();
                $role_per->status = $status;
                $role_per->save();
            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Role permission update successfully'
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
