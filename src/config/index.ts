import path from 'path';
import dotenv from 'dotenv';

function requireEnv(name: string) {
    if (!process.env[name]) {
        throw new Error(`${name} is not defined in environment variables`);
    }
    return process.env[name]!;
}

export function loadEnv() {
    const env = process.env.NODE_ENV || 'local';

    dotenv.config({
        path: path.resolve(process.cwd(), `.env.${env}`),
    });

    console.log(`✅ Loaded env: ${env}`);

    // validate AFTER dotenv loads
    requireEnv('PORT');
    requireEnv('JWT_KEY');
    requireEnv('MONGO_URL');
    requireEnv('CODE_SUBMISSION_DIR');

    // PPE-only (optional but recommended)
    if (env === 'ppe' || env === 'production') {
        requireEnv('R2_ENDPOINT');
        requireEnv('R2_ACCESS_KEY_ID');
        requireEnv('R2_SECRET_ACCESS_KEY');
        requireEnv('R2_BUCKET_NAME');
        requireEnv('R2_PUBLIC_URL');
    }
}

export const config = {
    get port() {
        return process.env.PORT!;
    },
    get jwtSecret() {
        return process.env.JWT_KEY!;
    },
    get mongoUrl() {
        return process.env.MONGO_URL!;
    },
    get codeSubmissionDir() {
        return process.env.CODE_SUBMISSION_DIR!;
    },
    get r2EndPoint() {
        return process.env.R2_ENDPOINT!;
    },
    get r2AccessKeyId() {
        return process.env.R2_ACCESS_KEY_ID!;
    },
    get r2SecretAccessKey() {
        return process.env.R2_SECRET_ACCESS_KEY!;
    },
    get r2BucketName() {
        return process.env.R2_BUCKET_NAME!;
    },
    get r2PublicUrl() {
        return process.env.R2_PUBLIC_URL!;
    }
};
