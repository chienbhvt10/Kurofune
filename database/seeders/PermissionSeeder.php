<?php

namespace Database\Seeders;

use App\Enums\UserPermission;
use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $permissions = UserPermission::asArray();

        foreach ($permissions as $permission)   {
            Permission::findOrCreate($permission, 'api');
        }

        // create role
        $role_admin = Role::findOrCreate(UserRole::ROLE_ADMIN, 'api');
        $role_vendor = Role::findOrCreate(UserRole::ROLE_VENDOR, 'api');
        $role_light_plan = Role::findOrCreate(UserRole::ROLE_LIGHT_PLAN, 'api');
        $role_full_support_plan = Role::findOrCreate(UserRole::ROLE_FULL_SUPPORT_PLAN, 'api');

        // give permissions
        foreach ($permissions as $permission)   {
            $role_admin->givePermissionTo($permission);
        }

        $permission_vendor = [
            UserPermission::PERMISSION_ACCESS_CHAT_24H,
            UserPermission::PERMISSION_ACCESS_ONLINE_PHARMACY,
            UserPermission::PERMISSION_ACCESS_INCOME,
            UserPermission::PERMISSION_ACCESS_OVERSEAS_REMITTANCE,
            UserPermission::PERMISSION_ACCESS_E_LEANING,
            UserPermission::PERMISSION_ACCESS_WABISABI,
            UserPermission::PERMISSION_PRODUCT_MANAGE,
            UserPermission::PERMISSION_ORDER_MANAGE,
            UserPermission::PERMISSION_VIEW_PAGE,
            UserPermission::PERMISSION_VIEW_CATEGORY_PRODUCT,
            UserPermission::PERMISSION_VIEW_ORDER_HISTORY,
            UserPermission::PERMISSION_VIEW_USER,
            UserPermission::PERMISSION_UPDATE_USER,
            UserPermission::PERMISSION_VIEW_PRODUCT,
            UserPermission::PERMISSION_VIEW_BILLING_ADDRESS,
            UserPermission::PERMISSION_UPDATE_BILLING_ADDRESS,
            UserPermission::PERMISSION_VIEW_SHIPPING_ADDRESS,
            UserPermission::PERMISSION_UPDATE_SHIPPING_ADDRESS,
            UserPermission::PERMISSION_UPDATE_USER_ADDRESS,
            UserPermission::PERMISSION_VIEW_PROFILE,

        ];

        foreach ($permission_vendor as $permission)   {
            $role_vendor->givePermissionTo($permission);
        }

        $permission_light_plan = [
            UserPermission::PERMISSION_ACCESS_CHAT_24H,
            UserPermission::PERMISSION_ACCESS_ONLINE_PHARMACY,
            UserPermission::PERMISSION_ACCESS_WABISABI,
            UserPermission::PERMISSION_VIEW_PAGE,
            UserPermission::PERMISSION_VIEW_CATEGORY_PRODUCT,
            UserPermission::PERMISSION_VIEW_ORDER_HISTORY,
            UserPermission::PERMISSION_VIEW_USER,
            UserPermission::PERMISSION_UPDATE_USER,
            UserPermission::PERMISSION_VIEW_PRODUCT,
            UserPermission::PERMISSION_UPDATE_USER_ADDRESS,
            UserPermission::PERMISSION_VIEW_PROFILE,
        ];

        foreach ($permission_light_plan as $permission)   {
            $role_light_plan->givePermissionTo($permission);
        }

        $permission_full_support_plan = [
            UserPermission::PERMISSION_ACCESS_CHAT_24H,
            UserPermission::PERMISSION_ACCESS_ONLINE_PHARMACY,
            UserPermission::PERMISSION_ACCESS_INCOME,
            UserPermission::PERMISSION_ACCESS_OVERSEAS_REMITTANCE,
            UserPermission::PERMISSION_ACCESS_E_LEANING,
            UserPermission::PERMISSION_ACCESS_WABISABI,
            UserPermission::PERMISSION_VIEW_PAGE,
            UserPermission::PERMISSION_VIEW_CATEGORY_PRODUCT,
            UserPermission::PERMISSION_VIEW_ORDER_HISTORY,
            UserPermission::PERMISSION_VIEW_USER,
            UserPermission::PERMISSION_UPDATE_USER,
            UserPermission::PERMISSION_VIEW_PRODUCT,
            UserPermission::PERMISSION_UPDATE_USER_ADDRESS,
            UserPermission::PERMISSION_VIEW_PROFILE,
        ];

        foreach ($permission_full_support_plan as $permission)   {
            $role_full_support_plan->givePermissionTo($permission);
        }
    }
}
