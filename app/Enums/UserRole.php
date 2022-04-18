<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserRole extends Enum
{
  const ROLE_ADMIN = 'administrator';
  const ROLE_VENDOR = 'vendor';
  const ROLE_LIGHT_PLAN = 'light plan';
  const ROLE_FULL_SUPPORT_PLAN = 'full support plan';
}
