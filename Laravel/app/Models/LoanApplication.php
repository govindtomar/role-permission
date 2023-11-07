<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoanApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'loan_applications';
    
    protected $fillable = ['name','email','phone','amount','loan_type_id',];

    
    public function loan_type(){
        return $this->belongsTo(LoanType::class);
    }

    public function loan_status(){
        return $this->belongsTo(LoanStatus::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'user_loan_application', 'loan_application_id', 'user_id')
            ->withPivot('create', 'read', 'update', 'delete', 'is_loaner');
    }
}
