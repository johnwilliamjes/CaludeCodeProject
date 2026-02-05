## TypeScript Challenge: `pMapLimit` (Concurrency-Limited Async Map)

### The challenge
Implement `pMapLimit(items, limit, mapper)`:

- **Runs** `mapper(item, index)` over all `items`
- **Limits concurrency** so at most `limit` mappers run at once
- **Preserves order** in the returned array
- **Rejects** if any mapper rejects (fail fast)
- Validations:
  - `limit` must be a positive integer

### Files
- `src/challenge.ts`: implementation + comments
- `test/challenge.test.ts`: tests that prove correctness (order + concurrency + error behavior)
- `src/index.ts`: tiny demo runner

### Setup

```bash
npm install
```

### Run tests

```bash
npm test
```

### Run the demo

```bash
npm run dev
```


