<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class SitemapController extends Controller
{

    public $url = 'https://www.vikeshi.com/';

    public $static_page = [
        'contact-us'
    ];

    public function index(){
        $categories = Category::where('status', 1)->get();
        $products = Product::with('category')->where('status', 1)->get();
        return response()->view('sitemap', [
            'url' => $this->url,
            'products' => $products,
            'categories' => $categories,
            'static_page'   =>  $this->static_page
        ])->header('Content-Type', 'text/xml');
    }
}
