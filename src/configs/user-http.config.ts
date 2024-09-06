import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.USER_API;
const key = process.env.USER_API_KEY;

export const getUserApiConfig = (): { key: string; url: string } => {
  return { url, key };
};
