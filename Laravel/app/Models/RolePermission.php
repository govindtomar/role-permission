<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RolePermission extends Model
{
    use HasFactory;

    protected $table = 'role_permission';  
    protected $fillable = [
        'route',
        'role_id',
        'permission_id',
        'status'
    ];

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function permission_module(){
        return $this->belongsTo(PermissionModule::class);
    }

    public function permission(){
        return $this->belongsTo(Permission::class, 'permission_id', 'id');
    }

    
}
