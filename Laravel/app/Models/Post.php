<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

	protected $table = 'posts';
	
    protected $fillable = ['name','profile','cover','user_id','status','publish',];

    public function user(){
		return $this->belongsTo(User::class);
	}

    
}