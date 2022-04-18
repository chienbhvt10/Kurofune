<?php

namespace Database\Seeders;

use App\Enums\Base;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = array(
            [
                'username' => 'wabisabimember_admin',
                'name' => 'wabisabi admin',
                'email' => 'support@wabisabi.media',
                'password' => Hash::make('c8XYcxq7jD4ERz8P'),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'active' => Base::USER_ACTIVE,
            ],
            [
                'username' => 'member_admin',
                'name' => 'KUROFUNE ADMIN',
                'email' => 'webmaster@wabisabi.media',
                'password' => Hash::make('c8XYcxq7jD4ERz8P'),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'active' => Base::USER_ACTIVE
            ],
            [
                'username' => 'developer',
                'name' => 'developer eassist',
                'email' => 'developer@eassist.jp',
                'password' => Hash::make('c8XYcxq7jD4ERz8P'),
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
                'active' => Base::USER_ACTIVE
            ]);

        $role = Role::findByName(UserRole::ROLE_ADMIN, 'api');
        foreach ($data as $item) {
            $admin = User::create($item);
            $admin->assignRole($role);
        }
    }
}
