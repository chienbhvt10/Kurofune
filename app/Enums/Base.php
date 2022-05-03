<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Base extends Enum
{
    const USER_ACTIVE = 1;
    const USER_INACTIVE = 0;
    const MALE = 0;
    const FEMALE = 1;
    const NO = 0;
    const YES = 1;
    const INSURANCE_STATUS_1 = 1;
    const INSURANCE_STATUS_2 = 2;
    const INSURANCE_STATUS_3 = 3;
    const INSURANCE_STATUS_4 = 4;
    const INSURANCE_STATUS_5 = 5;
    const INSURANCE_STATUS_6 = 6;
    const UNREGISTERED = 0;
    const REGISTERED = 1;
    const EDU_N1 = 1;
    const EDU_N2 = 2;
    const EDU_N3 = 3;
    const EDU_N4 = 4;
    const EDU_N5 = 5;
    const EDU_N0 = 6;
    const EDU_UNREGISTERED = 7;
    const EDU_UNDER_ERASURE = 8;
    const PATH_AVATAR_DEFAULT = 'avatars/default.png';
}
