const byId = (id) => document.getElementById(id);
const controls = ["horizon", "hours", "aht", "service", "answer", "peak"];
const weekPattern = [0.72, 0.91, 1.04, 1.13, 1.18, 0.94, 0.67];
let state = { history: [], forecast: [] };

function seededNoise(day) {
  const x = Math.sin(day * 127.1 + 19.7) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}
function buildHistory() {
  const today = new Date();
  const daily = [];
  for (let i = 55; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const day = (d.getDay() + 6) % 7;
    const trend = 68 + (55 - i) * 0.17;
    const count = Math.max(12, Math.round(trend * weekPattern[day] + seededNoise(i + 100) * 11));
    daily.push({ date: d, count });
  }
  return daily;
}
function makeForecast(history, horizon) {
  const weekdayValues = Array.from({ length: 7 }, (_, weekday) => {
    const matches = history.filter((d) => ((d.date.getDay() + 6) % 7) === weekday).slice(-8);
    return matches.reduce((sum, d) => sum + d.count, 0) / Math.max(matches.length, 1);
  });
  const recent = history.slice(-28).reduce((s, d) => s + d.count, 0) / 28;
  const previous = history.slice(-56, -28).reduce((s, d) => s + d.count, 0) / 28;
  const weeklyTrend = Math.max(-0.08, Math.min(0.12, recent / Math.max(previous, 1) - 1));
  const today = new Date();
  return Array.from({ length: horizon }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + 1);
    const weekday = (date.getDay() + 6) % 7;
    const dampedTrend = Math.pow(1 + weeklyTrend, Math.min(i / 7, 2));
    return { date, count: Math.round(weekdayValues[weekday] * dampedTrend) };
  });
}
function erlangC(agents, arrivalRate, serviceRate) {
  const offered = arrivalRate / serviceRate;
  if (agents <= offered) return { wait: 1, utilization: offered / agents, service: 0 };
  let term = 1;
  let sum = 1;
  for (let n = 1; n < agents; n += 1) { term *= offered / n; sum += term; }
  const last = term * offered / agents;
  const utilization = offered / agents;
  const wait = (last / (1 - utilization)) / (sum + last / (1 - utilization));
  const answerTimeHours = Number(byId("answer").value) / 3600;
  const service = 1 - wait * Math.exp(-(agents * serviceRate - arrivalRate) * answerTimeHours);
  return { wait, utilization, service };
}
function staffFor(tickets, hours, ahtMinutes, serviceTarget, peakMultiplier) {
  const peakArrivals = (tickets / hours) * peakMultiplier;
  const serviceRate = 60 / ahtMinutes;
  for (let agents = 1; agents <= 160; agents += 1) {
    const result = erlangC(agents, peakArrivals, serviceRate);
    if (result.service >= serviceTarget && result.utilization <= 0.85) return { agents, peakArrivals, ...result };
  }
  return { agents: 160, peakArrivals, utilization: 0, service: 0 };
}
function fmtDate(date) { return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }); }
function drawChart(history, forecast) {
  const svg = byId("volume-chart");
  const w = Math.max(svg.clientWidth || 720, 320); const h = 230;
  const plot = { x: 40, y: 12, w: w - 54, h: h - 42 };
  const visible = history.slice(-28).map((d) => ({ ...d, forecast: false })).concat(forecast.slice(0, 14).map((d) => ({ ...d, forecast: true })));
  const max = Math.ceil(Math.max(...visible.map((d) => d.count)) / 20) * 20;
  const slot = plot.w / visible.length; const barW = Math.max(2, slot * 0.66);
  let content = "";
  for (let i = 0; i <= 4; i += 1) {
    const y = plot.y + plot.h * i / 4; const val = max - max * i / 4;
    content += `<line class="grid-line" x1="${plot.x}" x2="${plot.x + plot.w}" y1="${y}" y2="${y}"/><text class="chart-label" x="2" y="${y + 3}">${Math.round(val)}</text>`;
  }
  const forecastPoints = [];
  visible.forEach((d, i) => {
    const x = plot.x + i * slot + (slot - barW) / 2; const bh = d.count / max * plot.h; const y = plot.y + plot.h - bh;
    content += `<rect class="bar${d.forecast ? " recent" : ""}" x="${x}" y="${y}" width="${barW}" height="${bh}" rx="2"><title>${fmtDate(d.date)}: ${d.count} tickets${d.forecast ? " forecast" : ""}</title></rect>`;
    if (d.forecast) forecastPoints.push(`${x + barW / 2},${y}`);
  });
  if (forecastPoints.length) content += `<polyline class="forecast-line" points="${forecastPoints.join(" ")}"/>`;
  content += `<text class="chart-label" x="${plot.x}" y="${h - 5}">28 DAYS HISTORY</text><text class="chart-label" x="${plot.x + plot.w - 95}" y="${h - 5}">FORECAST →</text>`;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`); svg.innerHTML = content;
}
function render() {
  const horizon = Number(byId("horizon").value); const hours = Number(byId("hours").value);
  const aht = Number(byId("aht").value); const target = Number(byId("service").value) / 100;
  const peak = Number(byId("peak").value) / 10; const answer = Number(byId("answer").value);
  byId("horizon-out").textContent = `${horizon} days`; byId("hours-out").textContent = `${hours} hours`;
  byId("aht-out").textContent = `${aht} min`; byId("service-out").textContent = `${Math.round(target * 100)}%`;
  byId("answer-out").textContent = `${answer} sec`; byId("peak-out").textContent = `${peak.toFixed(1)}×`;
  state.history = buildHistory(); state.forecast = makeForecast(state.history, horizon);
  const plans = state.forecast.map((d) => ({ ...d, ...staffFor(d.count, hours, aht, target, peak) }));
  const avg = Math.round(plans.reduce((s, d) => s + d.count, 0) / plans.length);
  const maxPlan = plans.reduce((a, b) => a.peakArrivals > b.peakArrivals ? a : b);
  const avgAgents = Math.ceil(plans.reduce((s, d) => s + d.agents, 0) / plans.length);
  byId("metrics").innerHTML = [
    ["AVG DAILY VOLUME", avg, "forecast tickets / day"], ["PEAK-HOUR STAFF", maxPlan.agents, "agents at the busiest peak"],
    ["AVG STAFF PLAN", avgAgents, "agents at the modeled peak"], ["TARGET SERVICE", `${Math.round(target * 100)}%`, `within ${answer}s · Erlang C`],
  ].map(([label, value, sub]) => `<div class="metric"><div class="metric-label">${label}</div><div class="metric-value">${value}</div><div class="metric-sub">${sub}</div></div>`).join("");
  byId("plan-body").innerHTML = plans.map((d) => `<tr><td>${fmtDate(d.date)}</td><td>${d.count}</td><td>${d.peakArrivals.toFixed(1)} / hr</td><td class="staff">${d.agents}</td><td>${(d.utilization * 100).toFixed(0)}%</td><td>${(d.service * 100).toFixed(1)}%</td></tr>`).join("");
  drawChart(state.history, state.forecast);
}
controls.forEach((id) => byId(id).addEventListener("input", render));
byId("recalculate").addEventListener("click", render);
window.addEventListener("resize", () => drawChart(state.history, state.forecast));
render();

