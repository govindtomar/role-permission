<?php
namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Requests\V1\ContactMeRequest;
use GovindTomar\CrudGenerator\Helpers\CRUDHelper;
use App\Models\ContactMe;
use DB;
use Auth;

class ContactMeController extends ApiController
{
    public function index()
    {
        try{
            $contact_mes = ContactMe::paginate(20);
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'ContactMe lists',
                'data' =>  $contact_mes,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function store(ContactMeRequest $request)
    {
        try{
            $contact_me = new ContactMe;
            $contact_me->name  =  $request->name;
			$contact_me->email  =  $request->email;
            $contact_me->save();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Save ContactMe',
                'data' =>  $contact_me,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id)
    {
        try{
            $contact_me = ContactMe::find($id);  
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show ContactMe',
                'data' =>  $contact_me,
            ]);          
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function update(ContactMeRequest $request)
    {
        try{
            $contact_me =  ContactMe::find($request->id);
            $contact_me->name  =  $request->name;
			$contact_me->email  =  $request->email;
            $contact_me->save();
            
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Update ContactMe',
                'data' =>  $contact_me,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function destroy($id)
    {
        try{
            $contact_me = ContactMe::find($id)->delete();
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Delete ContactMe',
                'data' =>  $contact_me,
            ]);

        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
    


}
