"use client";

import { useState, type CSSProperties } from "react";

type Metric = { count: number; sum: number };
type Week = { label: string; count: number; sum: number };
type PeriodData = {
  label: string;
  range: string;
  plan?: { total: number; B2C: number; B2B: number };
  total: Record<"fact" | "prepaid" | "weighted" | "raw", Metric>;
  B2C: Record<"fact" | "prepaid" | "weighted" | "raw", Metric>;
  B2B: Record<"fact" | "prepaid" | "weighted" | "raw", Metric>;
  weekly: Record<"prepaid" | "weighted" | "raw", Week[]>;
};

const monthWeeks = {
  prepaid: [["01–07.08", 4, 514860], ["08–14.08", 3, 574020], ["15–21.08", 8, 3931388], ["22–28.08", 11, 1888048], ["29–31.08", 0, 0]],
  weighted: [["01–07.08", 0, 0], ["08–14.08", 3, 100500], ["15–21.08", 8, 373000], ["22–28.08", 7, 67000], ["29–31.08", 0, 0]],
  raw: [["01–07.08", 0, 0], ["08–14.08", 3, 145000], ["15–21.08", 8, 795000], ["22–28.08", 7, 275000], ["29–31.08", 0, 0]],
} as const;

const yearWeeks = {
  prepaid: [["11–17.06", 1, 134480], ["25.06–01.07", 1, 200550], ["02–08.07", 1, 258000], ["16–22.07", 2, 165000], ["23–29.07", 5, 3090090], ["30.07–05.08", 2, 691380], ["06–12.08", 4, 444660], ["13–19.08", 12, 4746808], ["20–26.08", 14, 2309858]],
  weighted: [["14–20.05", 1, 50000], ["28.05–03.06", 2, 270000], ["18–24.06", 2, 77000], ["25.06–01.07", 5, 680645], ["02–08.07", 1, 25000], ["09–15.07", 6, 873500], ["16–22.07", 3, 274500], ["23–29.07", 5, 402000], ["30.07–05.08", 2, 149425], ["06–12.08", 16, 800500], ["13–19.08", 35, 7380500], ["20–26.08", 29, 7708500]],
  raw: [["14–20.05", 1, 100000], ["28.05–03.06", 2, 600000], ["18–24.06", 2, 160000], ["25.06–01.07", 5, 1079050], ["02–08.07", 1, 50000], ["09–15.07", 6, 1810000], ["16–22.07", 3, 570000], ["23–29.07", 5, 810000], ["30.07–05.08", 2, 298850], ["06–12.08", 16, 1510000], ["13–19.08", 35, 14935000], ["20–26.08", 29, 13000000]],
} as const;

const toWeeks = (rows: readonly (readonly [string, number, number])[]): Week[] => rows.map(([label, count, sum]) => ({ label, count, sum }));

const periods: Record<"month" | "year", PeriodData> = {
  month: {
    label: "Текущий месяц", range: "1–31 августа 2026", plan: { total: 68026312, B2C: 48026312, B2B: 20000000 },
    total: { fact: { count: 102, sum: 13207176 }, prepaid: { count: 32, sum: 9620436 }, weighted: { count: 19, sum: 590500 }, raw: { count: 19, sum: 1315000 } },
    B2C: { fact: { count: 98, sum: 11077216 }, prepaid: { count: 29, sum: 5607208 }, weighted: { count: 19, sum: 590500 }, raw: { count: 19, sum: 1315000 } },
    B2B: { fact: { count: 4, sum: 2129960 }, prepaid: { count: 3, sum: 4013228 }, weighted: { count: 0, sum: 0 }, raw: { count: 0, sum: 0 } },
    weekly: { prepaid: toWeeks(monthWeeks.prepaid), weighted: toWeeks(monthWeeks.weighted), raw: toWeeks(monthWeeks.raw) },
  },
  year: {
    label: "2026 год", range: "1 января–31 декабря 2026",
    total: { fact: { count: 534, sum: 81440256 }, prepaid: { count: 42, sum: 12040826 }, weighted: { count: 107, sum: 18691570 }, raw: { count: 107, sum: 34922900 } },
    B2C: { fact: { count: 515, sum: 65164957 }, prepaid: { count: 37, sum: 6596998 }, weighted: { count: 85, sum: 3176570 }, raw: { count: 85, sum: 6292900 } },
    B2B: { fact: { count: 19, sum: 16275299 }, prepaid: { count: 5, sum: 5443828 }, weighted: { count: 22, sum: 15515000 }, raw: { count: 22, sum: 28630000 } },
    weekly: { prepaid: toWeeks(yearWeeks.prepaid), weighted: toWeeks(yearWeeks.weighted), raw: toWeeks(yearWeeks.raw) },
  },
};

const money = (value: number) => value === 0 ? "0 ₽" : `${(value / 1_000_000).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} млн ₽`;
const percent = (value: number, plan: number) => value / plan * 100;

function MetricCard({ name, metric, b2c, b2b, plan, accent = false }: { name: string; metric: Metric; b2c: Metric; b2b: Metric; plan?: PeriodData["plan"]; accent?: boolean }) {
  const completion = plan ? percent(metric.sum, plan.total) : null;
  return <article className={`kpi pipeline-kpi${accent ? " accent" : ""}`} data-hint={`${name}: сделки отобраны по дате мероприятия выбранного периода.`} tabIndex={0}>
    <span>{name}</span><strong>{money(metric.sum)}</strong><small>{metric.count} сделок{completion !== null ? ` · выполнено ${completion.toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%` : ""}</small>
    {completion !== null && <div className="plan-track" aria-label={`Выполнение плана ${completion.toFixed(1)}%`}><i style={{ "--plan": `${Math.min(completion, 100)}%` } as CSSProperties} /></div>}
    <div className="kpi-average-values">
      <span>B2C <b>{money(b2c.sum)} · {b2c.count}</b>{plan && <small>план {money(plan.B2C)} · {percent(b2c.sum, plan.B2C).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%</small>}</span>
      <span>B2B <b>{money(b2b.sum)} · {b2b.count}</b>{plan && <small>план {money(plan.B2B)} · {percent(b2b.sum, plan.B2B).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%</small>}</span>
    </div>
  </article>;
}

function ComboChart({ title, subtitle, weeks }: { title: string; subtitle: string; weeks: Week[] }) {
  const maxCount = Math.max(...weeks.map((week) => week.count), 1);
  const maxSum = Math.max(...weeks.map((week) => week.sum), 1);
  const points = weeks.map((week, index) => `${weeks.length === 1 ? 50 : index / (weeks.length - 1) * 100},${92 - week.sum / maxSum * 76}`).join(" ");
  return <div className="combo-card">
    <div className="combo-title"><div><h3>{title}</h3><p>{subtitle}</p></div><span>столбцы — сделки · линия — сумма</span></div>
    <div className="combo-scroll">
      <div className="combo-chart" style={{ "--columns": weeks.length } as CSSProperties}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} /></svg>
        {weeks.map((week) => <div className="combo-week" key={week.label}>
          <div className="combo-value"><b>{week.count}</b><small>{money(week.sum)}</small></div>
          <div className="combo-bar"><i style={{ height: `${week.count / maxCount * 100}%` }} /></div>
          <small>{week.label}</small>
        </div>)}
      </div>
    </div>
  </div>;
}

export default function PipelineDashboard() {
  const [periodKey, setPeriodKey] = useState<"month" | "year">("month");
  return <section className="pipeline-dashboard" id="pipeline">
    <div className="period-toolbar reveal">
      <div><p className="eyebrow">Pipeline · данные на 26 августа</p><h2>Факт, предоплаты и прогноз</h2>{Object.entries(periods).map(([key, period]) => <span key={key} data-period-range={key} hidden={periodKey !== key}>{period.range}</span>)}</div>
      <label><span>Период</span><select data-period-select value={periodKey} onChange={(event) => setPeriodKey(event.target.value as "month" | "year")}><option value="month">Текущий месяц</option><option value="year">2026 год</option></select></label>
    </div>
    {Object.entries(periods).map(([key, data]) => <div key={key} data-period-panel={key} hidden={periodKey !== key}>
      <div className="kpi-grid reveal" aria-label={`Ключевые показатели: ${data.label}`}>
        <MetricCard name="Факт · сделка успешна" metric={data.total.fact} b2c={data.B2C.fact} b2b={data.B2B.fact} plan={data.plan} />
        <MetricCard name="Предоплачено" metric={data.total.prepaid} b2c={data.B2C.prepaid} b2b={data.B2B.prepaid} />
        <MetricCard name="Взвешенный pipeline" metric={data.total.weighted} b2c={data.B2C.weighted} b2b={data.B2B.weighted} accent />
        <MetricCard name="Сырой pipeline" metric={data.total.raw} b2c={data.B2C.raw} b2b={data.B2B.raw} />
      </div>
      {!data.plan && <p className="annual-plan-note">Процент выполнения годового плана не показан: годовой план не задан.</p>}
      <div className="pipeline-charts reveal">
        <ComboChart title="Вход в предоплаченные стадии" subtitle="По неделе изменения текущей стадии" weeks={data.weekly.prepaid} />
        <ComboChart title="Динамика взвешенного pipeline" subtitle="В работе и предложение · с актуальным прогнозом" weeks={data.weekly.weighted} />
        <ComboChart title="Динамика сырого pipeline" subtitle="Тот же контур до применения вероятности" weeks={data.weekly.raw} />
      </div>
    </div>)}
    <aside className="note reveal"><strong>Методика</strong><p>Факт и KPI отбираются по дате мероприятия. B2C-предоплата: «Внесена предоплата», «4 дня до банкета», «1 день до банкета», «Банкет начался»; B2B: «Договор и предоплата», «Подготовка к мероприятию», «Дополнительный счёт». Для B2B стадия предложения называется «Направлено КП». Недельные графики используют дату изменения текущей стадии; это снимок текущего статуса, а не полная история переходов.</p></aside>
  </section>;
}
