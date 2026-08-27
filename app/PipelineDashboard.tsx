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
};

const toWeeks = (rows: readonly (readonly [string, number, number])[]): Week[] => rows.map(([label, count, sum]) => ({ label, count, sum }));

const snapshotHistory = {
  prepaid: toWeeks([["20.08", 50, 12861661], ["27.08", 41, 11619838]]),
  weighted: toWeeks([["20.08", 124, 15258045], ["27.08", 107, 18691570]]),
  raw: toWeeks([["20.08", 124, 30350650], ["27.08", 107, 34922900]]),
};

// Корректировка РОП 27.08: сделка 85731, B2C, Людмила Запорожец.
// Из предоплат 420988 ₽ перенесена в факт 434988 ₽; количество сделок не увеличено.
const periods: Record<"month" | "year", PeriodData> = {
  month: {
    label: "Текущий месяц", range: "1–31 августа 2026", plan: { total: 68026312, B2C: 48026312, B2B: 20000000 },
    total: { fact: { count: 103, sum: 13642164 }, prepaid: { count: 31, sum: 9199448 }, weighted: { count: 19, sum: 590500 }, raw: { count: 19, sum: 1315000 } },
    B2C: { fact: { count: 99, sum: 11512204 }, prepaid: { count: 28, sum: 5186220 }, weighted: { count: 19, sum: 590500 }, raw: { count: 19, sum: 1315000 } },
    B2B: { fact: { count: 4, sum: 2129960 }, prepaid: { count: 3, sum: 4013228 }, weighted: { count: 0, sum: 0 }, raw: { count: 0, sum: 0 } },
  },
  year: {
    label: "2026 год", range: "1 января–31 декабря 2026",
    total: { fact: { count: 535, sum: 81875244 }, prepaid: { count: 41, sum: 11619838 }, weighted: { count: 107, sum: 18691570 }, raw: { count: 107, sum: 34922900 } },
    B2C: { fact: { count: 516, sum: 65599945 }, prepaid: { count: 36, sum: 6176010 }, weighted: { count: 85, sum: 3176570 }, raw: { count: 85, sum: 6292900 } },
    B2B: { fact: { count: 19, sum: 16275299 }, prepaid: { count: 5, sum: 5443828 }, weighted: { count: 22, sum: 15515000 }, raw: { count: 22, sum: 28630000 } },
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

function ComboChart({ title, subtitle, sumLabel, weeks }: { title: string; subtitle: string; sumLabel: string; weeks: Week[] }) {
  const maxCount = Math.max(...weeks.map((week) => week.count), 1);
  const maxSum = Math.max(...weeks.map((week) => week.sum), 1);
  const points = weeks.map((week, index) => `${(index + 0.5) / weeks.length * 100},${92 - week.sum / maxSum * 76}`).join(" ");
  return <div className="combo-card">
    <div className="combo-title"><div><h3>{title}</h3><p>{subtitle}</p></div><span>столбцы — сделки · линия — сумма</span></div>
    <div className="combo-scroll">
      <div className="combo-chart" style={{ "--columns": weeks.length } as CSSProperties}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points={points} /></svg>
        {weeks.map((week) => <div className="combo-week" key={week.label}>
          <div className="combo-value"><span className="combo-count">Сделок: <b>{week.count}</b></span><span className="combo-sum-label">{sumLabel}</span><strong className="combo-sum">{money(week.sum)}</strong></div>
          <div className="combo-bar"><i style={{ height: `${week.count / maxCount * 100}%` }} /></div>
          <small>На дату {week.label}.2026</small>
        </div>)}
      </div>
    </div>
  </div>;
}

export default function PipelineDashboard() {
  const [periodKey, setPeriodKey] = useState<"month" | "year">("month");
  return <section className="pipeline-dashboard" id="pipeline">
    <div className="period-toolbar reveal">
      <div><p className="eyebrow">Pipeline · выгрузки 26 августа + корректировка 27 августа</p><h2>Факт, предоплаты и прогноз</h2>{Object.entries(periods).map(([key, period]) => <span key={key} data-period-range={key} hidden={periodKey !== key}>{period.range}</span>)}</div>
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
    </div>)}
    <div className="snapshot-heading reveal"><p className="eyebrow">Динамика недельных снимков · мероприятия 2026 года</p><h2>История фактического состояния в даты отчётов</h2><p>Каждая точка — пересчёт всей выгрузки на дату обновления. Внутри одной календарной недели сохраняется последний снимок. Точка 27 августа — выгрузки 26 августа с уточнением проведённой сделки на 434 988 ₽.</p></div>
    <div className="pipeline-charts reveal">
      <ComboChart title="Предоплаченные сделки" subtitle="Годовой остаток на дату формирования отчёта" sumLabel="Сумма предоплаченных сделок" weeks={snapshotHistory.prepaid} />
      <ComboChart title="Взвешенный pipeline" subtitle="Годовой остаток · в работе и предложение · с прогнозом" sumLabel="Сумма с учётом вероятности" weeks={snapshotHistory.weighted} />
      <ComboChart title="Сырой pipeline" subtitle="Годовой остаток того же контура до применения вероятности" sumLabel="Сумма без взвешивания" weeks={snapshotHistory.raw} />
    </div>
    <aside className="note reveal"><strong>Методика</strong><p>Факт и KPI отбираются по дате мероприятия. B2C-предоплата: «Внесена предоплата», «4 дня до банкета», «1 день до банкета», «Банкет начался»; B2B: «Договор и предоплата», «Подготовка к мероприятию», «Дополнительный счёт». Для B2B стадия предложения называется «Направлено КП». Исторические графики больше не используют дату изменения стадии: они сравнивают сохранённые годовые снимки отчёта. Сопоставимая история начинается 20 августа; более ранние выгрузки охватывали только август и не включены в годовой ряд.</p></aside>
  </section>;
}
