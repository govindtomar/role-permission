<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User;
        $user->name = "Super Admin";
        $user->email = "admin@mail.com";
        $user->phone = "8989131933";
        $user->username = "super-admin";
        $user->password = Hash::make('Admin@123');
        // $user->uid = '0';
        $user->save();

        $user->roles()->attach(1);
    }
}
