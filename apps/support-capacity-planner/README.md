# Support Capacity Planner

An interactive workforce-planning prototype for a support operations team. It turns a daily ticket-demand forecast into a peak-hour staffing estimate under an explicit service-level target.

## Decision question

How many concurrent agents would be needed on each forecast day to answer at least the selected share of contacts within the selected wait threshold?

## What the demo does

- Creates 56 days of deterministic synthetic daily ticket counts with weekday seasonality, mild trend, and seeded noise.
- Forecasts 7–28 days from recent weekday averages, with a damped recent trend.
- Converts daily volume into a peak-hour arrival rate using operating hours and a configurable peak concentration.
- Finds the smallest integer staffing level meeting both the service-level target and a maximum 85% modeled utilization.
- Compares the base forecast plan with a user-selected 0–50% demand-uplift scenario and reports the additional peak staffing required.
- Shows the history, forecast, queue assumptions, and daily staffing table together so a planner can inspect the effect of changing assumptions.

## Queueing method

The staffing estimate uses Erlang C for a single pooled queue. For arrival rate \(\lambda\), per-agent service rate \(\mu\), and \(c\) agents, offered load is \(a=\lambda/\mu\) and utilization is \(\rho=a/c\). The probability of waiting is calculated from the Erlang C formula. The estimated probability of an answer within threshold \(t\) is \(1-P(wait)e^{-(c\mu-\lambda)t}\). The app searches whole-agent counts until the target is met.

## Assumptions and limitations

This is an educational planning model, not a production workforce-management system. It assumes a stationary peak-hour arrival rate, identical agents, one pooled queue, exponential service times, and no abandonment. The demand-uplift control is a scenario selected by the user, not a statistically estimated confidence interval. It excludes interval-level seasonality, channel mix, service skills, breaks, shrinkage, occupancy preferences, agent schedules, and forecast uncertainty intervals. The generated ticket data is synthetic and has no relation to an employer or customer.

For a production extension, use interval-level arrival and handle-time data, backtest forecasts with rolling-origin splits, compare the staffing plan with actual service outcomes, model shrinkage and skills, and quantify forecast uncertainty before making staffing decisions.

## Run

Open [`index.html`](./index.html) in a browser or visit the live [GitHub Pages demo](https://sumeetamin.github.io/applied-ml-ai-prototypes/apps/support-capacity-planner/). The app uses browser-native JavaScript and SVG; it needs no API key or backend.

