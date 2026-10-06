# Applied ML & AI Prototypes

Runnable product prototypes for realistic data and AI operations problems. Two demos use transparent synthetic examples; two have been benchmarked on real public datasets. The deployed apps are static, use aggregate benchmark outputs, and require no API credentials.

**Live demos:** [Open the project site](https://sumeetamin.github.io/applied-ml-ai-prototypes/).

## Live demos

- [Support Capacity Planner](./apps/support-capacity-planner/) — forecasts support arrivals, estimates Erlang C staffing, and compares base plans with a demand-uplift scenario. [Run demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/support-capacity-planner/).
- [Prompt Injection Defense Lab](./apps/prompt-injection-defense-lab/) — inspects heuristic match evidence, reports challenge-set trade-offs, and demonstrates least-privilege tool decisions. [Run demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/prompt-injection-defense-lab/).
- [E-commerce Conversion Prioritization](./apps/ecommerce-conversion/) — compares classifiers and the review-capacity trade-off on UCI session data. [Run demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/ecommerce-conversion/).
- [Retail Demand & Inventory Replenishment](./apps/retail-inventory/) — evaluates daily SKU demand with rolling time splits and explores reorder-point scenarios on UCI transactions. [Run demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/retail-inventory/).

The repository root is published to GitHub Pages from `main`.

## Run locally

Serve this directory with any static HTTP server (for example, `python -m http.server 8000` from the repository root) and open the local site. The two real-data demos fetch their aggregate JSON reports, so they need an HTTP origin instead of a `file://` tab. No build step or API key is required.

## Scope and limitations

These are portfolio prototypes, not production decision systems. The capacity and prompt-injection demos use deterministic synthetic examples. Conversion and retail demos use historical UCI data and publish aggregate results only; the session benchmark is a random split, and the retail benchmark covers twelve high-volume SKUs. Historical metrics do not establish causal impact or current business performance. Read each project's methodology and limitations before applying the ideas to a live setting.

## Reproduce real-data benchmarks

From the repository root, install the benchmark dependencies and run either script. Source archives download to ignored `benchmarks/*/data/` folders; raw rows, customer identifiers and invoices are not committed. Only aggregate metrics and anonymized SKU summaries are used by the static demos.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r benchmarks/requirements.txt
.\.venv\Scripts\python.exe benchmarks/ecommerce-conversion/run.py
.\.venv\Scripts\python.exe benchmarks/retail-inventory/run.py
```

Both datasets are CC BY 4.0. See each benchmark README for citation, split design, data cleaning and limits.

## Deployment

GitHub Pages publishes from the root of the `main` branch. Every committed HTML, CSS, or JavaScript update is reflected in the demos after the Pages build finishes.

