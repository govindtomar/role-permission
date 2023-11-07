<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanApplicant extends Model
{

	protected $table = 'loan_applicants';
	
    protected $fillable = ['name','email','phone','amount','user_id','loan_type_id','status',];

    public function user(){
		return $this->belongsTo(User::class);
	}

	public function loan_type(){
		return $this->belongsTo(LoanType::class);
	}

    
}