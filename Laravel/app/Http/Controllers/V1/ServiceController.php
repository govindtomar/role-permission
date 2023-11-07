<?php
namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Requests\V1\ServiceRequest;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\Service;
use DB;
use Auth;

class ServiceController extends ApiController
{
    public function index(Request $request)
    {
        try{
            $per_page = $request->per_page ? $request->per_page : 1;
            $services = Service::paginate($per_page);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Service lists',
                'data' =>  $services,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(ServiceRequest $request)
    {
        try{
            $service = new Service;
            $service->name  =  $request->name;
			$service->slug  =  $request->slug;
			$service->price  =  $request->price;
            $service->is_travel  =  $request->is_travel;
			$service->description  =  $request->description;
            $service->save();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save Service',
                'data' =>  $service,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $service = Service::find($id);  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show Service',
                'data' =>  $service,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(ServiceRequest $request)
    {
        try{
            $service =  Service::find($request->id);
            $service->name  =  $request->name;
			$service->slug  =  $request->slug;
			$service->price  =  $request->price;
            $service->is_travel  =  $request->is_travel;
			$service->description  =  $request->description;
            $service->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update Service',
                'data' =>  $service,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $service = Service::find($id)->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete Service',
                'data' =>  $service,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    
	public function status(Request $request){
        try{

    		$service = Service::find($request->id);
    		$service->status = $request->status;
    		$service->save();
            
            return $this->response([  
                'status' => $this->getStatusCode(),
                'message' => 'Status changed successfully',         
                'data' =>  $service,
            ]);

        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
	}
}
