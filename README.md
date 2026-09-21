# Expense Tracker

A browser-based application for recording daily expenses and tracking a running total.
Built with plain HTML, CSS and JavaScript — no frameworks, no build step, no dependencies.

**Live demo:** https://santoshi-barman.github.io/expense-tracker/


---

## Features

- **Add expenses** — record a description and an amount
- **Automatic total** — the sum is recalculated on every change
- **Delete entries** — each expense has its own delete control
- **Input validation** — empty descriptions, whitespace-only text and non-positive amounts are rejected with an on-screen message
- **Data persistence** — expenses are stored in the browser and restored automatically when the page is reopened

## Technology

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | JavaScript (ES6+) |
| Storage | Browser `localStorage` with JSON serialisation |

No installation or server is required — the application runs directly in the browser.

## Running locally

```bash
git clone https://github.com/Santoshi-barman/expense-tracker.git
cd expense-tracker
```

Open `index.html` in a browser, or serve the folder with any static server
(for example the Live Server extension in VS Code).

## Project structure

```
expense-tracker/
├── index.html    Page structure and element identifiers
├── style.css     Layout and visual styling
├── app.js        Application logic
└── README.md
```

## Implementation notes

**Render from data.** The expense list is never edited in place. All expenses live in a
single array, and `renderList()` rebuilds the list and the total from that array after every
change. Adding, deleting and restoring from storage therefore share one rendering path, and
the total needs no separate update logic.

**Persistence.** The array is serialised to JSON and written to `localStorage` whenever it
changes. On page load the stored value is read back and parsed. A guard handles the
first-visit case, where no stored value exists.

**Validation.** Descriptions are trimmed before being checked, so whitespace-only input is
rejected. Amounts are converted with `Number()` and must be greater than zero.

## Testing

Verified manually in the browser across 13 cases, covering validation, the running total,
deletion, and persistence — including a first-visit run with empty storage. All cases pass
with no console errors.

## Author

Santoshi Barman
