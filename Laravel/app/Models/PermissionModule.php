<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PermissionModule extends Model
{
    use HasFactory;

    protected $table = 'permission_modules';   
    protected $fillable = [
        'name',
        'slug',
        'status'
    ];

    public function roles(){
        return $this->belongsToMany(User::class, 'role_permission', 'role_id', 'permission_id');
    }

    public function role_permissions(){
        // return $this->hasMany(RolePermission::class);
        return $this->hasOneThrough(
            RolePermission::class,
            PermissionRoute::class,             
            'permission_id',
            'permission_id',
            'id',
            'id'
        );
    }

    public function permissions(){
        return $this->hasMany(Permission::class);
    }
}
