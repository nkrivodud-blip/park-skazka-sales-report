"use client";

import { useState } from "react";
import { reportPeriods, type ReportPeriodKey } from "./reportData";

type Direction = "all" | "B2C" | "B2B";
type CapacityData = (typeof reportPeriods)[ReportPeriodKey]["capacity"];
const pct = (a: number, b: number) => (b ? (a / b) * 100 : 0);

function directionData(periodKey: ReportPeriodKey, direction: Direction): CapacityData {
  const capacity = reportPeriods[periodKey].capacity;
  const directions = "directions" in capacity
    ? capacity.directions as Partial<Record<Direction, CapacityData>>
    : undefined;
  return directions?.[direction] ?? capacity;
}

function Panel({ periodKey, direction }: { periodKey: ReportPeriodKey; direction: Direction }) {
  const data = directionData(periodKey, direction);
  return <>
    <div className="capacity-summary reveal">
      <article><span>Мероприятий</span><strong>{data.events}</strong><small>учтено в расчёте</small></article>
      <article><span>Утилизация</span><strong>{pct(data.occupied, data.capacity).toLocaleString("ru-RU", { maximumFractionDigits: 2 })}%</strong><small>{data.occupied} из {data.capacity} слот-единиц</small></article>
      <article className="accent"><span>Выходные</span><strong>{pct(data.weekend.occupied, data.weekend.capacity).toLocaleString("ru-RU", { maximumFractionDigits: 2 })}%</strong><small>{data.weekend.occupied} из {data.weekend.capacity}</small></article>
      <article><span>Будни</span><strong>{pct(data.weekday.occupied, data.weekday.capacity).toLocaleString("ru-RU", { maximumFractionDigits: 2 })}%</strong><small>{data.weekday.occupied} из {data.weekday.capacity}</small></article>
    </div>
    <div className="chart-heading reveal"><h3>Утилизация по локациям</h3><p>Занятые слот-единицы ÷ доступная ёмкость периода</p></div>
    <div className="location-grid reveal">{data.locations.map((location) => <article key={location.name}><h3>{location.name}</h3><strong>{pct(location.occupied, location.capacity).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%</strong><progress max={location.capacity} value={location.occupied} /><p>{location.occupied} из {location.capacity} слот-единиц</p></article>)}</div>
  </>;
}

export default function CapacityDashboard() {
  const [periodKey, setPeriodKey] = useState<ReportPeriodKey>("september");
  const [direction, setDirection] = useState<Direction>("all");
  return <section className="section" id="capacity" data-dashboard>
    <div className="period-toolbar reveal">
      <div><p className="eyebrow">Утилизация площадок</p><h2>Загрузка по локациям</h2>{Object.entries(reportPeriods).map(([key, data]) => <span key={key} data-period-range={key} hidden={periodKey !== key}>{data.range}</span>)}</div>
      <div className="capacity-filters">
        <label><span>Период</span><select data-period-select value={periodKey} onChange={(event) => setPeriodKey(event.target.value as ReportPeriodKey)}>{Object.entries(reportPeriods).map(([key, data]) => <option value={key} key={key}>{data.label}</option>)}</select></label>
        <label><span>Направление</span><select value={direction} onChange={(event) => setDirection(event.target.value as Direction)}><option value="all">Общее</option><option value="B2C">B2C</option><option value="B2B">B2B</option></select></label>
      </div>
    </div>
    {(Object.keys(reportPeriods) as ReportPeriodKey[]).map((key) => <div key={key} data-period-panel={key} hidden={periodKey !== key}><Panel periodKey={key} direction={direction} /></div>)}
    <aside className="note reveal"><strong>Периметр расчёта</strong><p>Сентябрь: все сметы из папки «Проведено» и предоплаченные сметы из основной папки месяца. Лофт и беседки Лофта относятся к B2B, остальные локации — к B2C.</p></aside>
  </section>;
}
