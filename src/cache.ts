import Memcached from "memcached";

export class Cache {
    private memcached: Memcached;

    constructor() {
        this.memcached = new Memcached("localhost:11211", {
            poolSize: 256,
            idle: 1000,
        });
    }

    public async getValue(key: string): Promise<any> {

        const startTime = Date.now();

        return new Promise((resolve, reject) => {
            this.memcached.get(key, (err: Error, json: any) => {
                if (err !== null && err !== undefined) {
                    return reject(err);
                }
                if (typeof json !== "string") {
                    reject(new Error(`json is not string ${json}`));
                }
                try {
                    const value = JSON.parse(json);
                    resolve(value);

                    const responseTime = Date.now() - startTime;
                    // tslint:disable-next-line
                    console.log(`key ${key} ${responseTime}ms start:${startTime}`);

                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    public async setValue(key: string, value: any, lifetime: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const json = JSON.stringify(value);
            this.memcached.set(key, json, lifetime, (err: Error, result: boolean) => {
                if (err != null) {
                    return reject(err);
                }
                if (result === false) {
                    return reject(new Error(`can not set ${key}`));
                }
                resolve(result);
            });
        });
    }
}

export default new Cache();
