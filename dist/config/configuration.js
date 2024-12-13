"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvironment = void 0;
const fs = require("node:fs");
exports.default = () => ({
    isGlobal: true,
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        name: process.env.DATABASE_NAME || 'nest',
        username: process.env.DATABASE_USERNAME || 'nest',
        password: process.env.DATABASE_PASSWORD || 'password',
    },
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    },
});
const loadEnvironment = (env) => {
    if (!env) {
        return '.env';
    }
    const file = `${process.cwd()}/config/environment/${process.env.NODE_ENV}.env`;
    if (!fs.existsSync(file)) {
        return '.env';
    }
    const envFiles = [];
    envFiles.push(file);
    if (fs.existsSync(`${file}.local`)) {
        envFiles.unshift(`${file}.local`);
    }
    return envFiles;
};
exports.loadEnvironment = loadEnvironment;
//# sourceMappingURL=configuration.js.map