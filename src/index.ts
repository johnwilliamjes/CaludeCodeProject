import { pMapLimit } from "./challenge.js";
import { sleep } from "./utils.js";

async function main() {
  const items = [1, 2, 3, 4, 5, 6];
  const limit = 2;

  const startedAt = Date.now();
  const results = await pMapLimit(items, limit, async (n) => {
    // pretend this is an API call with variable latency
    await sleep(80 + (n % 3) * 40);
    return n * 10;
  });

  const elapsedMs = Date.now() - startedAt;
  console.log("items:   ", items);
  console.log("results: ", results);
  console.log("limit:   ", limit);
  console.log("elapsed: ", `${elapsedMs}ms`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});