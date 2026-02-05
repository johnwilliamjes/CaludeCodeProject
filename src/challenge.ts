export type Mapper<T, U> = (item: T, index: number) => Promise<U> | U;

/**
 * Concurrency-limited async map that preserves order.
 *
 * Requirements:
 * - At most `limit` mapper calls are in-flight at any time
 * - Returns results in the same order as `items`
 * - Rejects as soon as any mapper rejects (fail fast)
 */
export async function pMapLimit<T, U>(
  items: readonly T[],
  limit: number,
  mapper: Mapper<T, U>,
): Promise<U[]> {
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new TypeError(`limit must be a positive integer; got ${limit}`);
  }

  const results = new Array<U>(items.length);
  let nextIndex = 0;

  // Shared worker loop: each worker grabs the next index and processes it.
  async function worker(): Promise<void> {
    while (true) {
      const i = nextIndex;
      nextIndex += 1;
      if (i >= items.length) return;
      results[i] = await mapper(items[i], i);
    }
  }

  const workerCount = Math.min(limit, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());

  // If any worker rejects, Promise.all rejects immediately (fail fast).
  await Promise.all(workers);
  return results;
}



