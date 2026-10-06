# Conversion model benchmark

Run `python benchmarks/ecommerce-conversion/run.py` after installing `benchmarks/requirements.txt`. The script fetches UCI data locally, uses a stratified 60/20/20 train/validation/test split (seed 42), selects between logistic regression and histogram gradient boosting on validation average precision, chooses a validation F1 threshold, refits on train + validation, then scores the held-out test set. The report contains aggregate metrics and threshold confusion counts only—no session text or row-level scores.

Source, license, attribution and limitations: [UCI Online Shoppers Purchasing Intention](https://archive.ics.uci.edu/dataset/468/online+shoppers+purchasing+intention+dataset), CC BY 4.0; Sakar & Kastro (2018), DOI 10.24432/C5F88Q. Raw archives are git-ignored.

## Measured run

On the 2,466-session held-out test split, histogram gradient boosting achieved **0.737 average precision**, **0.930 ROC-AUC**, and **0.070 Brier score**. At the threshold chosen on validation (0.45), test precision was **0.689** and recall **0.649**. The majority-probability baseline average precision was **0.155**. These are one seeded historical split, not a guarantee of future store performance or intervention lift.

