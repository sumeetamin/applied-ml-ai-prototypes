# Applied ML & AI Prototypes

Small, runnable product prototypes for realistic data and AI operations problems. Each app uses generated demo data, runs entirely in the browser, and avoids external APIs or credentials.

**Live demos:** [Open the project site](https://sumeetamin.github.io/applied-ml-ai-prototypes/).

## Live demos

- [Support Capacity Planner](./apps/support-capacity-planner/) — forecasts support arrivals and estimates staffing with an Erlang C service-level model. [Run demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/support-capacity-planner/).
- [Prompt Injection Defense Lab](./apps/prompt-injection-defense-lab/) — explores attack detection, benchmark trade-offs, and least-privilege tool decisions. [Run demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/prompt-injection-defense-lab/).

The repository root is published to GitHub Pages from `main`.

## Run locally

Open `index.html` in a browser, or serve this directory with any static HTTP server. No build step, API key, or customer data is required.

## Scope and limitations

These are portfolio prototypes using deterministic synthetic data. They are not production staffing recommendations or a complete prompt-injection defense. The capacity model depends on simplifying assumptions; the injection detector is heuristic and must not be treated as a security boundary. See each app's page for its assumptions and intended use.

## Deployment

GitHub Pages publishes from the root of the `main` branch. Every committed HTML, CSS, or JavaScript update is reflected in the demos after the Pages build finishes.

