<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{

	protected $table = 'services';
	
    protected $fillable = ['name','slug','price','status','is_travel','description',];

    

    
}