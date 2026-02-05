# Executable Markdown: Google search (for Raptor mini)

**Overview** ✅

This repo includes an executable Markdown sample and a small Node script that performs a contextual Google search and returns structured JSON results. It's designed to be fed to a chat model (e.g., **Raptor mini (Preview)**) that can execute shell/Node commands.

---

## Files included 🔧

- `scripts/google-search.js` — Playwright script that performs a search and returns JSON
- `run-with-raptor-mini.md` — this file (instructions + runnable snippets)

---

## Prerequisites 💡

- Node.js 18+ and `npm`
- Internet access

---

## Install (local or inside a chat-run environment)

```bash
npm init -y
npm install playwright
npx playwright install
```

---

## Quick run (terminal)

```bash
# Basic run
node scripts/google-search.js --query "climate change"

# Contextual run (adds context to query to make results more targeted)
node scripts/google-search.js --query "emission reduction" --context "recent 2025 news"
```

If the environment is a chat capable of executing shell/Node (for example a Raptor mini execution environment), run the same commands from a shell block.

---

## How to feed this to a chat (Raptor mini) for execution 🧠

1. Provide the chat the following commands to run (install + execute):

```bash
npm install
node scripts/google-search.js --query "your query here" --context "optional context"
```

2. The script will print JSON to stdout with up to 5 search results (title, url, snippet).

> Note: If you want the chat to run the code _inline_ from this Markdown, you can paste the `scripts/google-search.js` code into a file in the execution environment and run it as above.

---

## Output example

```json
{
  "query": "climate change",
  "context": "",
  "results": [
    {
      "title": "Climate change - Google Search",
      "url": "https://www.example.com/",
      "snippet": "A short snippet..."
    }
  ]
}
```

---

## Usage notes & ethics ⚠️

- This is a small demo; do not use this for large-scale scraping. Respect robots.txt and terms of service.
- The script adds the `--context` string (if provided) to the search query to make the search more contextual.

---

## Need changes? 💬

Tell me whether you prefer **Python** or **Node**, headful browser for debugging, or GitHub Actions support and I will add it.
