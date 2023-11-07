<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
// use Kreait\Firebase\Auth as FirebaseAuth;
// use Kreait\Firebase\Exception\FirebaseException;
use App\Models\User;
use App\Models\Role;
use Validator;
use Auth;


class UserController extends ApiController
{
    // public function __construct(FirebaseAuth $auth){
    //     $this->middleware(['web', 'permission']);
    //     $this->auth = $auth;
    // }

    // public function __construct(){
    //     $this->middleware(['web', 'permission']);
    //     // $this->auth = $auth;
    // }
    
    public function index(Request $request){
        try{
            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = User::with('roles');
            if (isset($request->search)) {
                $qry->whereLike(['name', 'email', 'roles.name'], $request->search);
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

            $users = $qry->paginate($per_page);

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'User lists',
                'data' =>  $users,
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show(Request $request, $id){
        try{
            if($request->fid == 'fid'){
                $user = User::where('uid', $id)
                    ->where('id', '!=', Auth::id())->first();
            }else{
                $user = User::with('roles')->find($id);  
            }                

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show user',
                'data' =>  $user,
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
    
    public function store(Request $request){
        try{
        // return $request->all();
            $rules = array(
                'name' => ['required', 'string'],
                'email' => ['bail', 'required', 'email:strict', 'max:255', 'unique:users,email'],
                'user_roles' => ['required'],
                'password' => ['required', 'string', 'min:8'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->responseValidationError('Fields Validation Failed.', $validator);
            }

            // $firebaseUserProperties = [
            //     'email' => $request->email,
            //     'emailVerified' => false,
            //     'password' => $request->password,
            //     'phoneNumber' => $request->mobile,
            //     'displayName' => $request->first_name.' '.$request->last_name,
            //     'disabled' => false,
            // ];
            // $firebaseUser = $this->auth->createUser($firebaseUserProperties);

            $user = new User;
            $user->name = $request->name;
            $user->mobile = $request->mobile;
            $user->username = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            // $user->uid   =  $firebaseUser->uid;
            $user->save();

            foreach ($request->user_roles as $key => $user_role) {
                $role = Role::where('name', $user_role)->first();
                $user->roles()->attach($role->id);
            }

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'User save successfully',
                'data' =>  $user,
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
        // catch (FirebaseException $e) {
        //     return $this->errorResponse($e->getMessage());
        // }
    }

    public function update(Request $request){
        try{
        // return $request->all();
            $rules = array(
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'email' => ['bail', 'required', 'email:strict', 'max:255', 'unique:users,email'],
                'user_roles' => ['required'],
                // 'password' => ['required', 'string', 'min:8'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->responseValidationError('Fields Validation Failed.', $validator);
            }

            $user = User::find($request->id);
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            // $user->password = Hash::make($request->password);
            $user->save();

            $roles = [];
            foreach ($request->user_roles as $key => $user_role) {
                $roles[] = Role::where('name', $user_role)->first()->id;
            }

            $user->roles()->sync($roles);

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'User update successfully',
                'data' =>  $user,
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }


    public function changeStatus(Request $request){
        try{
        // return $request->all();
            $rules = array(
                'id' => ['required'],
                'status' => ['required']
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->responseValidationError('Fields Validation Failed.', $validator);
            }

            $user = User::find($request->id);
            $user->status = $request->status;
            $user->save();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'User update successfully',
                'data' =>  $user,
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    public function delete(Request $request){
        try{
        // return $request->all();
            $rules = array(
                'id' => ['required'],
            );

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return $this->responseValidationError('Fields Validation Failed.', $validator);
            }

            $user = User::find($request->id);
            $user->delete();

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'User delete successfully',
                'data' =>  $user,
            ]);
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
