process.env.DOTENV_CONFIG_QUIET = 'true';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const ENV = process.env.ENV?.toLowerCase() ?? 'uat';
const sharedEnvPath = path.resolve(__dirname, 'profiles', `.env.${ENV}`);
if (fs.existsSync(sharedEnvPath)) {
    dotenv.config({
        path: sharedEnvPath,
        override: true,
    });
}

const personalEnvPath = path.resolve(__dirname, 'profiles', `.env.${ENV}.local`);
if (fs.existsSync(personalEnvPath)) {
    dotenv.config({
        path: personalEnvPath,
        override: true,
    });
}
