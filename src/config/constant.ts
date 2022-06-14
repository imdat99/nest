import * as dotenv from 'dotenv';
dotenv.config();
import msg from './message';
export const MSG = msg;

export const JWT_SECRET_ACCESS = process.env.ACCESTOKEN_TOKEN_SECRET;
export const JWT_SECRET_REFRESH = process.env.REFRESHTOKEN_TOKEN_SECRET;
