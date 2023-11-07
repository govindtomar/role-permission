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
            $role = Role::where('slug', $slug)->first();
            $this->role_id = $role->id;

            $permissions  = PermissionModule::with(['permissions' => function($query){
                $query->with(['role_permissions'  => function($query){
                    $query->where('role_id', $this->role_id);
                }]);
            }])->get();

            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'permission lists',         
                'data' =>  $permissions,
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

}