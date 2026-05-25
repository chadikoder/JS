<div align="center">

# JS Tracker

**A clean, drawer-based study tracker for modern JavaScript (ES2023) — built as a teaching reference.**

[![Made by Chadi Khoder](https://img.shields.io/badge/made_by-Chadi_Khoder-f59e0b?style=for-the-badge)](https://github.com/chadikoder)
[![No build](https://img.shields.io/badge/no_build-static-f59e0b?style=for-the-badge)](https://github.com/chadikoder/JS)
[![License MIT](https://img.shields.io/badge/license-MIT-f59e0b?style=for-the-badge)](#license)

[**Open the tracker →**](https://chadikoder.github.io/JS/)

</div>

---

## What is this

A single-page study tracker for **JavaScript**, built as a teaching reference. Same UI/UX as my other trackers (PHP / HTML / CSS / JS / SQL), retuned per language with its own accent color. Zero build, zero dependency — open `index.html` and you are in.

```
7 days   · 7-day attack plan
90+      · exercises with full solutions
16       · W3Schools-style reference lessons
1        · clickable progress cube per lesson
∞        · re-readable until the exam
```

## Features

- **7-day plan** — one focused day at a time, exam-style
- **Real exercises** — every exercise has a worked solution you can reveal
- **Quizzes** — short MCQ per day to check what stuck
- **W3Schools references** — every lesson links to the matching W3 page
- **Drawer sidebar** — same on desktop and mobile, burger toggle, ESC closes
- **Click-to-complete** — the cube in the sidebar marks a lesson done
- **Per-day progress bar** — visual feedback as you advance
- **Dark / Light theme** — saved across sessions
- **Search** — `/` shortcut, fuzzy match across all lessons
- **Bookmarks** — pin tricky exercises to revisit
- **JS-aware syntax highlighter** — keywords, template literals, arrows
- **Keyboard shortcuts** — `←` `→` navigate, `T` toggle course/exos, `Esc` close
- **localStorage persistence** — your progress survives reloads
- **Accessibility** — semantic HTML, focus rings, ARIA where needed
- **SEO meta** — Open Graph + Twitter Cards configured

## Curriculum

1. **Variables, types, operations** — let/const, primitives, conversions, template literals, destructuring, spread
2. **Operateurs, conditions, boucles** — ===, ??, ?., logical assignment, array methods (map/filter/reduce/find)
3. **Fonctions & closures** — arrow vs function, this, default+rest params, debounce, throttle, memoize, compose
4. **Arrays & objects** — sort tricks, ES2023 toSorted/with, Object.entries, JSON, structuredClone
5. **DOM & events** — querySelector, classList, dataset, delegation, FormData, AbortController
6. **Async, Promises, fetch** — async/await, Promise.all/race/allSettled/any, retry+backoff, streaming
7. **Modules, classes, ES6+** — import/export, dynamic import, #private, generators, custom errors, TODO project

Plus a separate **W3Schools reference section** (Basic / Intermediate / Advanced) with 16 reference lessons.

## Quick start

```bash
git clone https://github.com/chadikoder/JS.git
cd JS
# Open index.html in any browser.
```

Or visit **https://chadikoder.github.io/JS/** (enable GitHub Pages first).

## Project structure

```
JS/
├── index.html
├── README.md
├── web/
│   ├── study_tracker.html
│   ├── css/style.css
│   ├── js/
│   │   ├── app.js          ← rendering + state + JS syntax highlight
│   │   └── data.js         ← curriculum
│   └── image/logo.svg
└── .nojekyll
```

## Extending the curriculum

Edit `web/js/data.js`. Two arrays: `DAYS` and `GIO`. After editing, bump the `?v=N` cache-bust in `web/study_tracker.html`.

## Tech stack

| | |
|---|---|
| Markup | HTML5 |
| Style | CSS3 |
| Logic | Vanilla JavaScript (ES2023) |
| State | localStorage |
| Build | None |

## Related trackers

By the same author, same design system:

- [chadikoder/PHP](https://github.com/chadikoder/PHP) — PHP + NFA042 exam prep
- [chadikoder/HTML](https://github.com/chadikoder/HTML) — HTML5
- [chadikoder/CSS](https://github.com/chadikoder/CSS) — CSS3
- [chadikoder/JS](https://github.com/chadikoder/JS) — Modern JavaScript
- [chadikoder/SQL](https://github.com/chadikoder/SQL) — SQL

## Author

**Chadi Khoder** — [@chadikoder](https://github.com/chadikoder)

## License

MIT — use it, fork it, share it with your students.
