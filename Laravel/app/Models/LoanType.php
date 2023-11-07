<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanType extends Model
{

	protected $table = 'loan_types';
	
    protected $fillable = ['name','slug','detail','media','status',];

    

    
	public function loan_applicants(){
		return $this->hasMany(LoanApplicant::class);
	}

}