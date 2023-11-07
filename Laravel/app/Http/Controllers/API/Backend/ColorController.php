<?php
namespace App\Http\Controllers\V1\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Requests\V1\ColorRequest;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\Color;
use DB;
use Auth;

class ColorController extends ApiController
{
    public function index(Request $request)
    {
        try{

            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = Color::query();

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

            $colors = $qry->paginate($per_page);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Color lists',
                'data' =>  $colors,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function indexAll()
    {
        try{
            $colors = Color::all();  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Color lists',
                'data' =>  $colors,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(ColorRequest $request)
    {
        try{
            $color = new Color;
            $color->name  =  $request->name;
			$color->slug  =  $request->slug;
			$color->code  =  $request->code;
            $color->save();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save Color',
                'data' =>  $color,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $color = Color::find($id);  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show Color',
                'data' =>  $color,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(ColorRequest $request)
    {
        try{
            $color =  Color::find($request->id);
            $color->name  =  $request->name;
			$color->slug  =  $request->slug;
			$color->code  =  $request->code;
            $color->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update Color',
                'data' =>  $color,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $color = Color::find($id);
            $color->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete Color',
                'data' =>  $color,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    
	public function status(Request $request){
        try{
    		$color = Color::find($request->id);
    		$color->status = $request->status;
    		$color->save();

    		return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Color status changed',
                'data' =>  $color,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
	}



}
