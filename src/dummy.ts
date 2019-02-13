/**
 * save dummy cache data to memcached
 */

import crypto from "crypto";

import cache from "./cache";

function md5(value: any): string {
    const hash = crypto.createHash("md5");
    hash.update(value);
    return hash.digest("hex");
}

function sha256(value: any): string {
    const hash = crypto.createHash("sha256");
    hash.update(value);
    return hash.digest("base64");
}

function sha512(value: any): string {
    const hash = crypto.createHash("sha512");
    hash.update(value);
    return hash.digest("base64");
}

for (let i = 1; i <= 100; i++) {
    const users = [];
    for (let j = 0; j < 100; j++) {
        const id = i * 1000 + j;
        users.push({
            id,
            md5: md5(`${id}`),
            sha256: sha256(`${id}`),
            sha512: sha512(`${id}`),
        });
    }
    const data = {
        listId: i,
        users,
    };
    const key = `test_${i}`;
    cache.setValue(key, data, 3600)
        .then(() => {
            // tslint:disable-next-line:no-console
            console.log(`saved ${key}`);
        })
        .catch((err) => {
            // tslint:disable-next-line:no-console
            console.error(`[Error] save failed ${key} ${err}`);
        });
}
