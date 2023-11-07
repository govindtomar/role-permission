<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PermissionModule;
use Route;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $block_modules = [
            'auth',
            'routes',
        ];


        $filter_modules = [];
        foreach ($this->routes() as $key => $route) {
            $mod = explode("/", $route['uri'])[0];
            if(!in_array($mod, $filter_modules)){
                $filter_modules[] = $mod;
            }
        }
        
        $modules = [];
        foreach ($filter_modules as $key => $module) {
            $r = [];
            if (!in_array($module, $block_modules)) {
                foreach ($this->routes() as $rkey => $route) {
                    if ($module == explode("/", $route['uri'])[0]) {
                       $r[] = [
                            'uri' => $route['uri'],
                            'name' => $route['name'],
                            'method' => $route['method']
                        ];
                    }
                }
                $modules[] = [
                    "name"  =>  $module,
                    "route" =>  $r
                ];
            }
        }

        foreach ($modules as $key => $module) {
            $permission_module = new PermissionModule;
            $permission_module->name = $this->remove_special_char(ucwords($module['name'])) . ' module';
            $permission_module->module_api = $module['name'];
            $permission_module->save();
            foreach ($module['route'] as $key => $route) {
                $pr = new Permission;
                $pr->api = $route['uri'];
                $pr->url = $this->permission_url($route, $module);
                $pr->route_name = $route['name'];
                $pr->method = $route['method'];
                $pr->name = ucfirst($this->permission_name($route, $module['name']));
                $pr->permission_module_id = $permission_module->id;
                $pr->save();
            }
        }        
    }

    public function permission_name($route, $module_name){
        foreach (['create', 'index', 'update', 'delete', 'status', 'show'] as $value) {
            if($route['name'] == $module_name.'.'.$value){
                if($value == 'index'){
                    return 'view';
                }
                return $value;
            }
        }
        return $this->remove_special_char(str_replace($module_name.".","", $route['name']));
    }

    public function remove_special_char($string){
        $string = str_replace('-', ' ', $string);
        $string = str_replace('_', ' ', $string);
        return $string;
    }

    public function permission_url($route, $module){
        $uri = $route['uri'];
        if (strpos($route['name'], 'update') !== false && $route['method'] == 'PUT') {
            $uri = $uri."/:id/edit";         
        }
        if (strpos($route['name'], 'create') !== false && $route['method'] == 'POST') {
            $uri = $uri."/add";         
        }
        if (strpos($route['name'], 'delete') !== false && $route['method'] == 'DELETE') {
            $uri = "no-url-required";         
        }
        if (strpos($route['name'], 'status') !== false && $route['method'] == 'POST') {
            $uri = "no-url-required";         
        }      
        if ($uri == 'permission/add' && $route['method'] == 'POST') {
            $uri = $uri."/:id";         
        }elseif($uri == 'permission/:id/edit' && $route['method'] == 'PUT') {
            $uri = $uri."/:pid";         
        }

      
        if (strpos($uri, '{slug}') !== false) {
            $uri = str_replace("{slug}", ":slug", $uri);
        }
        if (strpos($uri, '{id}') !== false) {
            $uri = str_replace("{id}", ":id", $uri);
        }
        return $uri;
    }

    public function routes(){
        $routes = collect(\Route::getRoutes())->map(function ($route) { 
            return[
                "uri"   =>  $route->uri(),
                "name"  =>  $route->getName(),
                "method"    =>  $route->methods()[0]
            ];
        });

        $route = [];
        foreach ($routes as $r) {
            if (strpos($r['uri'], 'api') !== false) {
                $route[] = [
                    "uri"   =>  str_replace(["api/v1/", "api/"], "", $r['uri']),
                    "name"  =>  $r['name'],
                    "method"    =>  $r['method']
                ];
            }
        }
        return $route;
    }
}
