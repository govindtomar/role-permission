<?php

namespace App\Http\Controllers\V1\Frontend;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Product;
use Auth;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\ProductMedia;

class ProductController extends ApiController
{
    public function index(Request $request){
        try{

            $per_page = $request->per_page ? $request->per_page : 100;
            $qry = Product::with('category','sub_categories', 'image')
                ->where('is_publish', true)
                ->where('status', true);

            if (isset($request->category)) {
                $qry->whereLike('category.name', $request->category);
            }

            if (isset($request->search)) {
                $qry->whereLike(['name', 'slug', 'code', 'description', 'category.name'], $request->search);
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

            $products = $qry->paginate($per_page);

            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Product lists',
                'data' =>  $products,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }

    public function show($id){
        try{
            $product = Product::with('category','sub_categories', 'images', 'affiliates')
                    ->where('slug', $id)
                    ->orWhere('code', $id)
                    ->first();
            if($product == null){

            }
            return $this->response([
                'status' => $this->getStatusCode(),
                'message' => 'Show Product',
                'data' =>  $product,
            ]);
        }catch(\Exception $e){
            return $this->errorResponse($e->getMessage());
        }
    }
}
