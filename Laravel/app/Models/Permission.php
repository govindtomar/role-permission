<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'status'
    ];


    public function permission_module(){
        return $this->belongsTo(PermissionModule::class);
    }

    public function role_permissions(){
        return $this->hasOne(RolePermission::class, 'permission_id', 'id',);
    }
}
