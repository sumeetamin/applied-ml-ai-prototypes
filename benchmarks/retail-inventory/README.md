# Retail demand benchmark

Run `python benchmarks/retail-inventory/run.py` after installing `benchmarks/requirements.txt`. The script fetches UCI Online Retail II, excludes canceled invoices and nonpositive or invalid item quantities, selects twelve SKUs by sales before the final 56-day holdout, compares weekly seasonal-naive and trailing-28-day-mean forecasts over eight expanding weekly origins, selects on the first four validation folds, and reports metrics on the last four test folds. Only aggregate SKU demand summaries are published.

Source, license and attribution: [UCI Online Retail II](https://archive.ics.uci.edu/dataset/502/online+retail), CC BY 4.0; Chen (2012), DOI 10.24432/C5CG6D. Raw workbook archives are git-ignored.

## Measured run

The selected trailing-28-day-mean forecast reached **0.875 test WAPE** and **99.04 MAE units per SKU-day** across the final four weekly folds. The previous-week same-weekday baseline reached **0.943 test WAPE**. The moving average was better on this holdout, but its absolute error remains large; this is evidence that simple baselines are insufficient for deployment and that stockouts, promotions, intermittency and richer covariates need investigation.

