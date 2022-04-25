<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserPermission extends Enum
{
  const PERMISSION_ACCESS_ONLINE_PHARMACY = 'access url online pharmacy';
  const PERMISSION_ACCESS_CHAT_24H = 'access url chat 24h';
  const PERMISSION_ACCESS_INCOME = 'access url income';
  const PERMISSION_ACCESS_OVERSEAS_REMITTANCE = 'access url overseas remittance';
  const PERMISSION_ACCESS_E_LEANING = 'access url e-learning';
  const PERMISSION_ACCESS_WABISABI = 'access url wabisabi';

  const PERMISSION_VIEW_PAGE = 'view page';
  const PERMISSION_VIEW_CATEGORY_PRODUCT = 'view category product';
  const PERMISSION_VIEW_ORDER_HISTORY = 'view order history';
  const PERMISSION_VIEW_USER = 'view user';
  const PERMISSION_UPDATE_USER = 'update user';
  const PERMISSION_VIEW_PRODUCT = 'view product';
  const PERMISSION_VIEW_BILLING_ADDRESS = 'view billing address';
  const PERMISSION_UPDATE_BILLING_ADDRESS = 'update billing address';
  const PERMISSION_VIEW_SHIPPING_ADDRESS = 'view shipping address';
  const PERMISSION_UPDATE_SHIPPING_ADDRESS = 'update shipping address';
  const PERMISSION_VIEW_PROFILE = 'view profile';


  const PERMISSION_USER_MANAGE = 'manage user';
  const PERMISSION_VENDOR_MANAGE = 'manage vendor';
  const PERMISSION_PAGE_MANAGE = 'manage page';
  const PERMISSION_PRODUCT_CATEGORY_MANAGE = 'manage product category';
  const PERMISSION_PRODUCT_MANAGE = 'manage product';
  const PERMISSION_ORDER_MANAGE = 'manage order';
  const PERMISSION_PERMISSION_MANAGE = 'manage permission';
  const PERMISSION_BILLING_ADDRESS_MANAGE = 'manage billing address';
  const PERMISSION_SHIPPING_ADDRESS_MANAGE = 'manage shipping address';
  const PERMISSION_TAX_MANAGE = 'manage tax';
  const PERMISSION_SHIPPING_METHOD_MANAGE = 'manage shipping method';
  const PERMISSION_CART_MANAGE = 'manage cart';
  const PERMISSION_CHAT_LOG_USER_MANAGE = 'manage chat log user';
}
