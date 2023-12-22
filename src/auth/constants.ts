import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
    secret: "7E58bdvhWdt7Df_aA7_WxQ"
}