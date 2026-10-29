import { SetMetadata } from '@nestjs/common';

export const IS_PAGINATIED_KEY = 'is_paginted';

export const Paginated = () => SetMetadata(IS_PAGINATIED_KEY, true);

