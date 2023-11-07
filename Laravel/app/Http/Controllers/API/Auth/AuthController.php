<?php
namespace App\Http\Controllers\API\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\ApiController;
use App\Exceptions\ApiException;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Controllers\API\Backend\RolePermission\RolePermissionController;

class AuthController extends ApiController
{

    public function login(LoginRequest $request){
        try {
            
            return $this->auth($request, 'User login successfully');

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }


    public function register(RegisterRequest $request) {

        try{

            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = rand(10000000,1000000000);
            $user->password = bcrypt($request->password);
            $user->save();

            $user->roles()->attach(1);

            return $this->auth($request, 'User registered successfully');

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }

    }


    private function auth($request, $message){
        $credentials = $request->only('email', 'password');

        if (! $token = auth()->attempt($credentials)) {
            return $this->errorResponse('Username and password not found', 201);
        }

        $data = User::with('roles')->find(Auth::id());
        $rpc = new RolePermissionController;

        return $this->response([
            'status' => $this->getStatusCode(),
            'message' => $message,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'data' => $data,
            'rpc'  => $rpc->routes()
        ]);

    }


    public function logout() {
        try{
            auth()->logout();

        return $this->response([
            'status' => $this->getStatusCode(),
            'message' => 'User logout successfully',
        ]);

        } catch (ApiException $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
    

    public function refresh() {
        try{
	       	return $this->response([
	            'status' => $this->getStatusCode(),
	            'message' => "Token refresh successfully",
                'access_token' => auth()->refresh(),
                'token_type' => 'Bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
	        ]);
        } catch (ApiException $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

}