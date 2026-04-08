import { describe, expect, it } from "vitest";
import { pMapLimit } from "../src/challenge.js";
import { sleep } from "../src/utils.js";

describe("pMapLimit", () => {
  it("preserves order", async () => {
    const items = [3, 1, 2];
    const out = await pMapLimit(items, 2, async (n) => {
      await sleep(10 * n);
      return n * 100;
    });
    expect(out).toEqual([300, 100, 200]);
  });

  it("enforces concurrency limit", async () => {
    const items = Array.from({ length: 10 }, (_, i) => i);
    const limit = 3;

    let inFlight = 0;
    let maxInFlight = 0;

    await pMapLimit(items, limit, async () => {
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await sleep(20);
      inFlight -= 1;
      return "ok";
    });

    expect(maxInFlight).toBeLessThanOrEqual(limit);
    expect(maxInFlight).toBe(limit);
  });

  it("rejects when a mapper rejects", async () => {
    const items = [1, 2, 3, 4];
    await expect(
      pMapLimit(items, 2, async (n) => {
        if (n === 3) throw new Error("boom");
        await sleep(10);
        return n;
      }),
    ).rejects.toThrow("boom");
  });

  it("validates limit", async () => {
    await expect(pMapLimit([1], 0, (x) => x)).rejects.toThrow(
      /positive integer/i,
    );
    await expect(pMapLimit([1], 1.5, (x) => x)).rejects.toThrow(
      /positive integer/i,
    );
    await expect(pMapLimit([1], -1, (x) => x)).rejects.toThrow(
      /positive integer/i,
    );
    await expect(pMapLimit([1], Number.NaN, (x) => x)).rejects.toThrow(
      /positive integer/i,
    );
    await expect(pMapLimit([1], Number.POSITIVE_INFINITY, (x) => x)).rejects.toThrow(
      /positive integer/i,
    );
  });

  it("handles empty array", async () => {
    const result = await pMapLimit([], 2, (x) => x);
    expect(result).toEqual([]);
  });

  it("does not call mapper for empty input", async () => {
    let calls = 0;
    const result = await pMapLimit([], 4, () => {
      calls += 1;
      return "never";
    });

    expect(result).toEqual([]);
    expect(calls).toBe(0);
  });

  it("supports synchronous mapper", async () => {
    const items = [1, 2, 3];
    const result = await pMapLimit(items, 2, (x) => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it("limit larger than items length", async () => {
    const items = [1, 2];
    const result = await pMapLimit(items, 5, (x) => x * 10);
    expect(result).toEqual([10, 20]);
  });

  it("passes item index to mapper", async () => {
    const items = ["a", "b", "c"];
    const result = await pMapLimit(items, 2, (value, index) => `${index}:${value}`);
    expect(result).toEqual(["0:a", "1:b", "2:c"]);
  });

  it("rejects when mapper throws synchronously", async () => {
    await expect(
      pMapLimit([1, 2], 2, (n) => {
        if (n === 1) throw new Error("sync boom");
        return n;
      }),
    ).rejects.toThrow("sync boom");
  });
});