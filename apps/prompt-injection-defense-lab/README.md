# Prompt Injection Defense Lab

A browser-only threat-modeling lab for retrieval-augmented assistants. It provides a transparent phrase-rule baseline, a small labeled challenge set, and a simulated least-privilege tool policy.

## What the demo does

- Scans pasted untrusted text for instruction override, role escalation, prompt extraction, data exfiltration, concealment, sensitive-resource access, and side-effect patterns.
- Reports matched rules rather than presenting a black-box risk score.
- Shows a short, safely escaped text excerpt for each matched rule so a reviewer can see what triggered the heuristic.
- Measures precision, recall, F1, and confusion counts on a tiny synthetic challenge set, with per-example errors visible.
- Demonstrates a restrictive tool allowlist: knowledge search and source summarization are allowed in the toy policy; email, deletion, SQL, and unrestricted network access are denied by default.
- Runs entirely in the browser and makes no model/API calls; entered text is not sent to a server by this app.

## Evaluation design

The benchmark is deliberately phrase-biased and contains 18 manually authored examples. Its metrics describe only those examples and should not be generalized to real attack rates or model security. A stronger evaluation should include held-out attacks, paraphrases, multilingual samples, indirect injection through documents, benign security discussion, false-positive review, and a threat model tied to the specific tools and data available to the agent.

## Security boundary

The detector is a teaching baseline, not a security control. Text classifiers can miss novel or obfuscated attacks and can flag benign text. User-provided text is escaped before being placed in result markup. Retrieved content must remain untrusted data. Real authorization belongs in the application and tool server: use least privilege, validate every action against trusted user intent, constrain arguments and destinations, require approval for side effects, and log decisions. Never rely on this browser demo to secure a deployed agent.

## Run

Open [`index.html`](./index.html) in a browser or visit the live [GitHub Pages demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/prompt-injection-defense-lab/). No API key, backend, or customer data is needed.

