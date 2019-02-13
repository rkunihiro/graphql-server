import cache from "./cache";

if (process.argv.length < 3) {
    // tslint:disable-next-line:no-console
    console.log(`usage: ts-node dump.ts <cacheKey>`);
    process.exit(0);
}

const key = process.argv[2];

// tslint:disable-next-line:no-console
console.log(`dump ${key}`);

cache.getValue(key)
    .then((data) => {
        // tslint:disable-next-line:no-console
        console.log(data);
    })
    .catch((err) => {
        // tslint:disable-next-line:no-console
        console.error(err);
    });
