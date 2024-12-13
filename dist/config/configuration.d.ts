declare const _default: () => {
    isGlobal: boolean;
    port: number;
    database: {
        host: string;
        port: number;
        name: string;
        username: string;
        password: string;
    };
    firebase: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
    };
};
export default _default;
export declare const loadEnvironment: (env?: string) => string | string[];
