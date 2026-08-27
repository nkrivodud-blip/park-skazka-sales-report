"use client";

import { useEffect, useState, type CSSProperties } from "react";
import PipelineDashboard from "./PipelineDashboard";

function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }
    const started = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - started) / 850, 1);
      setDisplay(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{display.toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>;
}

const weekly = [
  ["27.04–03.05", 36, true], ["04–10.05", 119], ["11–17.05", 120], ["18–24.05", 162],
  ["25–31.05", 148], ["01–07.06", 125], ["08–14.06", 119], ["15–21.06", 118],
  ["22–28.06", 127], ["29.06–05.07", 155], ["06–12.07", 146], ["13–19.07", 179],
  ["20–26.07", 148], ["27.07–02.08", 152], ["03–09.08", 190, true], ["10–16.08", 124], ["17–23.08", 161],
] as const;

const pipelineGrowth = [
  ["27.04–03.05", 1.69, 1.69, 0, true], ["04–10.05", 12.18, 4.68, 7.50],
  ["11–17.05", 13.81, 6.35, 7.47], ["18–24.05", 18.57, 9.92, 8.65],
  ["25–31.05", 12.25, 6.87, 5.38], ["01–07.06", 10.74, 9.12, 1.61],
  ["08–14.06", 11.50, 6.15, 5.35], ["15–21.06", 7.71, 5.04, 2.68],
  ["22–28.06", 18.07, 7.55, 10.51], ["29.06–05.07", 9.27, 6.54, 2.73],
  ["06–12.07", 12.25, 5.79, 6.47], ["13–19.07", 11.71, 5.16, 6.55],
  ["20–26.07", 8.84, 5.71, 3.13], ["27.07–02.08", 6.23, 4.47, 1.76],
  ["03–09.08", 4.17, 1.37, 2.80, true],
] as const;

const prepaidGrowth = [
  ["27.04–03.05", 0.554, 6, 0.554, 0], ["04.05–10.05", 0.538, 8, 0.538, 0],
  ["11.05–17.05", 4.349, 27, 4.349, 0], ["18.05–24.05", 5.844, 38, 5.844, 0],
  ["25.05–31.05", 4.552, 25, 3.154, 1.397], ["01.06–07.06", 5.477, 36, 5.477, 0],
  ["08.06–14.06", 6.216, 38, 6.216, 0], ["15.06–21.06", 7.052, 38, 6.190, 0.863],
  ["22.06–28.06", 4.060, 33, 3.550, 0.510], ["29.06–05.07", 3.817, 24, 3.239, 0.578],
  ["06.07–12.07", 3.006, 26, 3.006, 0], ["13.07–19.07", 3.411, 38, 3.011, 0.400],
  ["20.07–26.07", 7.100, 33, 3.822, 3.277], ["27.07–02.08", 11.518, 57, 6.081, 5.436],
  ["03.08–09.08", 2.167, 23, 2.167, 0, true],
] as const;

const managers = [
  { name: "Александр Воронин", direction: "B2C", total: 6, wonCount: 1, wonSum: 296320, wonAvg: 296320, activeCount: 3, activeRaw: 180000, activeWeighted: 45000, activeAvg: 60000, prepaidCount: 1, prepaidSum: 250500, prepaidAvg: 250500 },
  { name: "Варвара Чугреева", direction: "B2C", total: 58, wonCount: 15, wonSum: 1_491_450, wonAvg: 99_430, activeCount: 4, activeRaw: 350_000, activeWeighted: 115_000, activeAvg: 87_500, prepaidCount: 6, prepaidSum: 773_870, prepaidAvg: 128_978 },
  { name: "Кристина Могачева", direction: "B2B", total: 38, wonCount: 4, wonSum: 2_129_960, wonAvg: 532_490, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 2, prepaidSum: 3_631_828, prepaidAvg: 1_815_914 },
  { name: "Кристина Могачева", direction: "B2C", total: 73, wonCount: 24, wonSum: 2_449_356, wonAvg: 102_056, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 9, prepaidSum: 1_457_660, prepaidAvg: 161_962 },
  { name: "Лилия Рамазанова", direction: "B2C", total: 45, wonCount: 13, wonSum: 1_550_190, wonAvg: 119_245, activeCount: 5, activeRaw: 390_000, activeWeighted: 235_000, activeAvg: 78_000, prepaidCount: 4, prepaidSum: 351_230, prepaidAvg: 87_808 },
  { name: "Людмила Запорожец", direction: "B2C", total: 145, wonCount: 27, wonSum: 3_733_520, wonAvg: 138_279, activeCount: 7, activeRaw: 395_000, activeWeighted: 195_500, activeAvg: 56_429, prepaidCount: 8, prepaidSum: 2_741_948, prepaidAvg: 342_744 },
  { name: "Наталья Криводуд", direction: "B2B", total: 2, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Наталья Криводуд", direction: "B2C", total: 7, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Яна Кузнецова", direction: "B2B", total: 13, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 1, prepaidSum: 381_400, prepaidAvg: 381_400 },
  { name: "Яна Кузнецова", direction: "B2C", total: 7, wonCount: 3, wonSum: 132_040, wonAvg: 44_013, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 1, prepaidSum: 32_000, prepaidAvg: 32_000 },
  { name: "Дмитрий Григорьев", direction: "B2C", status: "увольнение 14.08", total: 35, wonCount: 8, wonSum: 824_500, wonAvg: 103_062, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Татьяна Баландина", direction: "B2C", status: "уволена", total: 29, wonCount: 7, wonSum: 599_840, wonAvg: 85_691, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
] as const;

const pipelineDirections = [
  { direction: "B2C", deals: 45, raw: 3_387_750, weighted: 1_783_475 },
  { direction: "B2B", deals: 0, raw: 0, weighted: 0 },
] as const;

const pipelineStages = [
  ["B2C · В работе", 26, 805_475, "по прогнозу"],
  ["B2C · Сделано предложение", 19, 978_000, "по прогнозу"],
] as const;

const forecastBuckets = [
  ["Верю, что закроется", 6, 767_750, 690_975, "90%"],
  ["Верю, но с рисками", 24, 1_895_000, 947_500, "50%"],
  ["Не верю", 15, 725_000, 145_000, "20%"],
] as const;

const compactMoney = (value: number) => value === 0
  ? "0 ₽"
  : value >= 1_000_000
    ? `${(value / 1_000_000).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} млн ₽`
    : `${Math.round(value / 1_000).toLocaleString("ru-RU")} тыс. ₽`;

const managerPlans: Record<string, number> = {
  "Людмила Запорожец-B2C": 12006577.895833332,
  "Александр Воронин-B2C": 12006577.895833332,
  "Варвара Чугреева-B2C": 12006577.895833332,
  "Лилия Рамазанова-B2C": 12006577.895833332,
  "Кристина Могачева-B2B": 10000000,
  "Яна Кузнецова-B2B": 10000000,
};
const exactMoney = (value: number) => Math.round(value).toLocaleString("ru-RU") + " ₽";
const locations = [
  {
    "name": "Айва-парк · все беседки",
    "occupied": 23,
    "capacity": 186,
    "offers": 0,
    "detail": "23 занятых слот-единиц из 186. В том числе предложения: 0."
  },
  {
    "name": "Айва-парк · домик",
    "occupied": 12,
    "capacity": 62,
    "offers": 1,
    "detail": "12 занятых слот-единиц из 62. В том числе предложения: 1."
  },
  {
    "name": "Лофт и пять беседок",
    "occupied": 63,
    "capacity": 341,
    "offers": 2,
    "detail": "63 занятых слот-единиц из 341. В том числе предложения: 2."
  },
  {
    "name": "Дино · все шатры",
    "occupied": 10,
    "capacity": 186,
    "offers": 1,
    "detail": "10 занятых слот-единиц из 186. В том числе предложения: 1."
  },
  {
    "name": "Веранда Мадагаскар",
    "occupied": 53,
    "capacity": 186,
    "offers": 2,
    "detail": "53 занятых слот-единиц из 186. В том числе предложения: 2."
  },
  {
    "name": "Шатёр FOOD",
    "occupied": 9,
    "capacity": 186,
    "offers": 0,
    "detail": "9 занятых слот-единиц из 186. В том числе предложения: 0."
  },
  {
    "name": "Нитро · оба шатра",
    "occupied": 14,
    "capacity": 124,
    "offers": 0,
    "detail": "14 занятых слот-единиц из 124. В том числе предложения: 0."
  }
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">ПС</span><span>Продажи · август</span></a>
        <nav aria-label="Разделы отчёта">
          <a href="#leads">Лиды</a><a href="#managers">Менеджеры</a><a href="#pipeline">Pipeline</a><a href="#capacity">Площадки</a>
        </nav>
      </header>

      <section className="hero reveal" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Отдел продаж · август 2026 · данные на 26 августа</p>
          <h1>Факт, предоплаты и pipeline собраны в одну картину.</h1>
          <p className="lead">
            В августе закрыто 102 сделки на 13,21 млн ₽. Ещё 32 сделки находятся на предоплаченных стадиях,
            а взвешенный августовский pipeline по актуальным прогнозам составляет 0,59 млн ₽.
          </p>
          <div className="hero-actions"><a className="button primary" href="#pipeline">Смотреть сверку</a><a className="button ghost" href="#leads">Разобрать лиды</a></div>
        </div>
        <div className="hero-score">
          <span>Прогноз к плану августа</span>
          <strong><Counter value={33.6} suffix="%" decimals={1} /></strong>
          <div className="score-track" aria-hidden="true"><i style={{ width: "33.6%" }} /></div>
          <small>22,83 млн ₽ из 68,03 млн ₽ · факт + предоплаты</small>
        </div>
      </section>

      <PipelineDashboard />

      <section className="section" id="leads">
        <div className="section-heading reveal">
          <p className="eyebrow">Лиды · 17–23 августа</p>
          <h2>NQL и QL лиды.</h2>
          <p>161 NQL лид, из них 142 QL. Конверсия из NQL в QL — 88,2%.</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="17,7 — показатель, предоставленный РОП отдельно. Расчёт 161 NQL за 7 календарных дней даёт 23 в день." tabIndex={0}><span>Среднее в день</span><strong>17,7</strong><small>Значение по данным РОП</small></article>
          <article data-hint="161 NQL лид за 17–23 августа по данным РОП." tabIndex={0}><span>NQL лиды</span><strong>161</strong><small>17–23 августа</small></article>
          <article className="accent" data-hint="142 QL лида из 161 NQL за 17–23 августа по данным РОП." tabIndex={0}><span>QL лиды</span><strong>142</strong><small>из 161 NQL</small></article>
          <article data-hint="Конверсия NQL → QL = 142 ÷ 161 × 100%." tabIndex={0}><span>Конверсия</span><strong>88,2%</strong><small>NQL → QL</small></article>
        </div>
        <div className="chart-heading reveal"><h3>NQL лиды по неделям</h3><p>История недель сохранена · 17–23 августа добавлено по данным РОП · звёздочкой отмечены неполные недели</p></div>
        <div className="week-chart reveal" aria-label="NQL лиды по неделям">
          {weekly.map(([label, value, partial]) => <div className="week-col" key={label}><div className="week-value">{value}</div><div className="week-track"><i style={{ "--height": `${value / 204 * 100}%` } as CSSProperties} /></div><small>{label}{partial ? "*" : ""}</small></div>)}
        </div>
      </section>

      <section className="section" id="managers">
        <div className="section-heading reveal">
          <h2>Показатели по менеджерам</h2>
          <p>Август 2026 · Выполнение = проведено ÷ план × 100%. Осталось до плана = план − проведено, не ниже нуля. Планы — из файла «Распределение плана».</p>
        </div>
        {(["B2C", "B2B"] as const).map((direction) => <div className="table-card manager-group reveal" key={direction}>
          <div className="table-title">
            <div><h3>{direction}</h3><p>Конверсия объединяет успешные и предоплаченные сделки. В работе — только согласованные стадии с заполненным прогнозом.</p></div>
            <span>План августа: {exactMoney(direction === "B2C" ? 48026311.58333333 : 20000000)}</span>
          </div>
          <div className="data-table manager-table">
            <div className="data-head"><span>Менеджер</span><span>Конверсия в успех / предоплату</span><span>Проведено</span><span>Предоплачено</span><span>Взвешенный pipeline</span><span>Сырой pipeline</span><span>План августа</span><span>Выполнение</span><span>Осталось до плана</span></div>
            {managers.filter((m) => m.direction === direction && m.name !== "Наталья Криводуд").map((manager) => {
              const plan = managerPlans[`${manager.name}-${direction}`];
              const execution = plan ? manager.wonSum / plan * 100 : 0;
              return (
                <div className="data-row" key={manager.name}>
                  <strong>{manager.name}{("status" in manager && manager.status) && <small className="manager-status">{manager.status}</small>}</strong>
                  <span className="metric-value"><strong>{(manager.total ? (manager.wonCount + manager.prepaidCount) / manager.total * 100 : 0).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%</strong><small>{manager.wonCount + manager.prepaidCount} из {manager.total} сделок</small></span>
                  <span><strong>{compactMoney(manager.wonSum)}</strong><small>{manager.wonCount} шт. · чек {compactMoney(manager.wonAvg)}</small></span>
                  <span><strong>{compactMoney(manager.prepaidSum)}</strong><small>{manager.prepaidCount} шт. · чек {compactMoney(manager.prepaidAvg)}</small></span>
                  <span><strong>{compactMoney(manager.activeWeighted)}</strong><small>{manager.activeCount} сделок в работе</small></span>
                  <span><strong>{compactMoney(manager.activeRaw)}</strong><small>{manager.activeCount} шт. · чек {compactMoney(manager.activeAvg)}</small></span>
                  <span><strong>{plan ? exactMoney(plan) : "Не задан"}</strong></span>
                  <span><strong>{plan ? execution.toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + "%" : "—"}</strong>{plan && <progress max={100} value={Math.min(100, execution)} aria-label="Выполнение плана" />}</span>
                  <span><strong>{plan ? exactMoney(Math.max(0, plan - manager.wonSum)) : "—"}</strong></span>
                </div>
              );
            })}
          </div>
        </div>)}
        <aside className="note reveal"><strong>Методика конверсии</strong><p>Конверсия = (количество сделок на стадии «Сделка успешна» + количество сделок на предоплаченных стадиях) ÷ все сделки менеджера в августовской выборке × 100%. Сделки не пересекаются по стадиям. Для B2C предоплаченный контур включает «Внесена предоплата», «4 дня до банкета», «1 день до банкета» и «Банкет начался»; для B2B — «Договор и предоплата», «Подготовка к мероприятию» и «Дополнительный счёт».</p></aside>
      </section>

      <section className="section legacy-pipeline" id="pipeline-details-archive">
        <div className="section-heading reveal">
          <p className="eyebrow">Pipeline на август</p>
          <h2>1,78 млн ₽ взвешенного pipeline на 45 сделках.</h2>
          <p>В pipeline включены только сделки «В работе» и «Сделано предложение» с актуально заполненным полем «Прогноз закрытия».</p>
        </div>
        <div className="capacity-summary reveal">
          <article className="accent" data-hint="Сумма сделок в работе и со сделанным предложением до применения вероятности прогноза." tabIndex={0}><span>Raw pipeline</span><strong>3,39 млн ₽</strong><small>45 сделок · B2C 3,39 · B2B 0</small></article>
          <article data-hint="Raw-сумма каждой сделки умножена на актуальную вероятность из поля «Прогноз закрытия»." tabIndex={0}><span>Взвешенный pipeline</span><strong>1,78 млн ₽</strong><small>B2C 1,78 · B2B 0</small></article>
          <article data-hint="Предоплаченные сделки показаны отдельно и не включены в pipeline." tabIndex={0}><span>Предоплачено</span><strong>39 сделок</strong><small>6,34 млн ₽ · B2C 5,31 · B2B 1,03</small></article>
          <article data-hint="Фактически закрытые сделки со стадией «Сделка успешна» и датой мероприятия в августе." tabIndex={0}><span>Проведено</span><strong>72 сделки</strong><small>8,95 млн ₽ · B2C 7,37 · B2B 1,57</small></article>
          <article className="fact-average-card" data-hint="Средний чек рассчитан только по фактически закрытым сделкам в стадии «Сделка успешна» за август: отдельно по B2C и B2B." tabIndex={0}>
            <span>Средний чек · факт</span>
            <div className="fact-average-values"><strong>B2C 106,9 тыс. ₽</strong><strong>B2B 524,9 тыс. ₽</strong></div>
            <small>69 B2C-сделок · 3 B2B-сделки</small>
          </article>
        </div>
        <div className="dual-tables reveal">
          <div className="table-card">
            <div className="table-title"><div><h3>Стадии pipeline</h3><p>Сумма в таблице уже взвешена по вероятности закрытия.</p></div><span>1,78 млн ₽</span></div>
            <div className="data-table source-table"><div className="data-head"><span>Стадия</span><span>Сделок</span><span>Weighted</span></div>{pipelineStages.map(([stage, count, weighted, probability]) => <div className="data-row" key={stage}><strong>{stage}<small> · {probability}</small></strong><span>{count}</span><strong>{compactMoney(weighted)}</strong></div>)}</div>
          </div>
          <div className="table-card">
            <div className="table-title"><div><h3>Прогноз закрытия</h3><p>Только стадии «В работе» и «Сделано предложение».</p></div><span>1,78 млн ₽ weighted</span></div>
            <div className="data-table comparison-table"><div className="data-head"><span>Оценка</span><span>Сделок</span><span>Raw</span><span>Weighted</span></div>{forecastBuckets.map(([label, count, raw, weighted, probability]) => <div className="data-row" key={label}><strong>{label}<small> · {probability}</small></strong><span>{count}</span><span>{compactMoney(raw)}</span><strong>{compactMoney(weighted)}</strong></div>)}</div>
          </div>
        </div>
        <div className="table-card reveal">
          <div className="table-title"><div><h3>Pipeline по менеджерам</h3><p>Raw и weighted суммы по текущему владельцу сделки.</p></div><span>45 сделок</span></div>
          <div className="pipeline-direction-summary">
            {pipelineDirections.map((item) => <article key={item.direction} data-hint={`${item.direction}: средний чек рассчитан от raw pipeline.`} tabIndex={0}><span>{item.direction}</span><strong>{compactMoney(item.weighted)}</strong><small>{item.deals} сделок · raw {compactMoney(item.raw)}</small><em>Средний чек {item.deals ? compactMoney(item.raw / item.deals) : "—"}</em></article>)}
          </div>
          <div className="data-table pipeline-manager-table"><div className="data-head"><span>Менеджер</span><span>Сделок</span><span>Raw</span><span>Weighted</span></div>{managers.filter((manager) => manager.activeCount > 0).map((manager) => <div className="data-row" key={`pipeline-${manager.name}-${manager.direction}`}><strong>{manager.name}<small> · {manager.direction}</small></strong><span>{manager.activeCount}</span><span>{compactMoney(manager.activeRaw)}</span><strong>{compactMoney(manager.activeWeighted)}</strong></div>)}</div>
        </div>
        <aside className="note reveal"><strong>Правило расчёта</strong><p>Успешные и предоплаченные сделки вынесены отдельно. В pipeline входят только сделки в работе и со сделанным предложением, если в них актуально заполнено поле «Прогноз закрытия».</p></aside>
      </section>

      <section className="section legacy-pipeline" id="legacy-pipeline">
        <div className="section-heading reveal">
          <p className="eyebrow">Bitrix × брифы × ParkOps</p>
          <h2>Три системы пока считают август по-разному.</h2>
          <p>Bitrix после дублей: 148 активных сделок и 23,81 млн ₽ raw. ParkOps показывает 177 записей, около 25 млн ₽ raw и около 16 млн ₽ weighted. ParkOps остаётся снимком на 4 августа, суммы pipeline на экране округлены.</p>
        </div>
        <div className="quality-grid reveal">
          <article className="quality-card" data-hint="Чистый эффект расхождений по активным сделкам: положительные и отрицательные корректировки взаимозачтены." tabIndex={0}><strong>+399 тыс. ₽</strong><span>чистая корректировка по активным сметам</span><p>22 телефонных расхождения; полный список — в Excel.</p></article>
          <article className="quality-card critical" data-hint="Разница между количеством записей в ParkOps и активными августовскими сделками Bitrix после удаления дублей." tabIndex={0}><strong>+29 записей</strong><span>ParkOps против очищенного Bitrix</span><p>Нужно унифицировать фильтры стадий, даты закрытия и правила включения WON.</p></article>
          <article className="quality-card critical" data-hint="Сделки, у которых плановая дата закрытия уже прошла, но карточка остаётся в активном pipeline ParkOps." tabIndex={0}><strong>71 сделка</strong><span>с просроченной датой закрытия в ParkOps</span><p>Около 18 млн ₽ raw «прилипли» к периоду и могут завышать прогноз.</p></article>
        </div>
        <div className="growth-block reveal">
          <div className="table-title">
            <div><h3>Денежный приток в pipeline по неделям</h3><p>Текущая сумма сделок без дублей, сгруппированная по неделе создания.</p></div>
            <span>среднее +11,75 млн ₽/нед.</span>
          </div>
          <div className="capacity-summary growth-summary">
            <article className="accent" data-hint="Средняя текущая сумма сделок, созданных за одну полную неделю. Это валовый приток, а не изменение остатка pipeline." tabIndex={0}><span>Средний валовый приток</span><strong>+11,75 млн ₽</strong><small>13 полных недель</small></article>
            <article data-hint="Средний недельный приток суммы новых сделок воронки «Дни рождения»." tabIndex={0}><span>B2C в среднем</span><strong>+6,40 млн ₽</strong><small>54,4% притока</small></article>
            <article data-hint="Средний недельный приток суммы новых сделок воронки «Корпоративные мероприятия»." tabIndex={0}><span>B2B в среднем</span><strong>+5,35 млн ₽</strong><small>45,6% притока</small></article>
            <article data-hint="Сумма сделок, созданных с 27 июля по 2 августа, и её изменение относительно предыдущей полной недели." tabIndex={0}><span>Последняя полная неделя</span><strong>+6,23 млн ₽</strong><small>−29,5% к предыдущей</small></article>
          </div>
          <div className="chart-heading compact"><h3>Приток новых сделок по неделям</h3><p>Полная текущая сумма созданных сделок · B2C и B2B · млн ₽</p></div>
          <div className="growth-chart" aria-label="Приток суммы сделок в pipeline по неделям">
            {pipelineGrowth.map(([label, total, b2c, b2b, partial]) => (
              <div className="growth-col" key={label}>
                <div className="growth-value">+{total.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
                <div className="growth-track">
                  <i className="b2b" style={{ "--height": `${b2b / 18.57 * 100}%` } as CSSProperties} />
                  <i className="b2c" style={{ "--height": `${b2c / 18.57 * 100}%` } as CSSProperties} />
                </div>
                <small>{label}{partial ? "*" : ""}</small>
              </div>
            ))}
          </div>
          <div className="growth-legend"><span><i className="b2c" />B2C</span><span><i className="b2b" />B2B</span><small>* неполная неделя · суммы в млн ₽</small></div>
        </div>
        <div className="growth-block reveal" id="prepaid">
          <div className="table-title">
            <div><h3>Приток оплаченных сделок</h3><p>Расширенный оплаченный контур B2C/B2B, по неделе изменения текущей стадии.</p></div>
            <span>451 сделка · 69,84 млн ₽</span>
          </div>
          <div className="capacity-summary growth-summary">
            <article className="accent" data-hint="Количество текущих сделок на согласованных оплаченных и последующих стадиях обеих воронок." tabIndex={0}><span>Сделок в оплаченном контуре</span><strong>451</strong><small>437 B2C · 14 B2B</small></article>
            <article data-hint="Полная стоимость всех 451 сделок оплаченного контура, а не только внесённые авансы." tabIndex={0}><span>Полный объём сделок</span><strong>69,84 млн ₽</strong><small>B2C 57,38 · B2B 12,46</small></article>
            <article data-hint="Сумма значений, внесённых менеджерами в поле предоплаты Bitrix. Это не банковский реестр поступлений." tabIndex={0}><span>Указанная предоплата</span><strong>15,92 млн ₽</strong><small>по заполненным полям Bitrix</small></article>
            <article data-hint="Доля сделок оплаченного контура, в карточках которых заполнено поле суммы предоплаты." tabIndex={0}><span>Заполненность суммы предоплаты</span><strong>91,8%</strong><small>414 из 451 карточки</small></article>
          </div>
          <div className="chart-heading compact"><h3>Динамика оплаченного контура по неделям</h3><p>Неделя изменения текущей стадии · сумма сделок и количество карточек</p></div>
          <div className="growth-chart" aria-label="Динамика расширенного оплаченного контура по неделям">
            {prepaidGrowth.map(([label, amount, deals, b2c, b2b, partial]) => (
              <div className="growth-col" key={label}>
                <div className="growth-value">{amount ? `${amount.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ${deals}` : "0"}</div>
                <div className="growth-track">
                  <i className="b2b" style={{ "--height": `${b2b / 11.518 * 100}%` } as CSSProperties} />
                  <i className="b2c" style={{ "--height": `${b2c / 11.518 * 100}%` } as CSSProperties} />
                </div>
                <small>{label}{partial ? "*" : ""}</small>
              </div>
            ))}
          </div>
          <div className="growth-legend"><span><i className="b2c" />B2C</span><span><i className="b2b" />B2B</span><small>над столбцом: полный объём, млн ₽ · количество сделок</small></div>
          <div className="reactivation paid-stage-grid">
            <article data-hint="В B2C оплаченный контур начинается со стадии внесённой предоплаты и включает все последующие операционные стадии." tabIndex={0}><span>B2C · включённые стадии</span><strong>437 сделок · 57,38 млн ₽</strong><p>Внесена предоплата · 4 дня до банкета · 1 день до банкета · банкет начался · сделка успешна.</p></article>
            <article data-hint="В B2B оплаченный контур начинается со стадии договора и предоплаты и включает подготовку, дополнительный счёт и успешное завершение." tabIndex={0}><span>B2B · включённые стадии</span><strong>14 сделок · 12,46 млн ₽</strong><p>Договор и предоплата · подготовка к мероприятию · доп счёт · сделка успешна.</p></article>
          </div>
        </div>
        <aside className="note reveal"><strong>Ограничение показателя</strong><p>Для последующих стадий дата изменения текущей стадии не равна дате внесения предоплаты. Поэтому график показывает движение расширенного оплаченного контура, а не банковский cash-in. Поле «Дата оплаты» заполнено только в 2 из 451 карточки; для точного денежного притока нужна история стадий или реестр платежей.</p></aside>
        <div className="table-card reveal">
          <div className="data-table comparison-table">
            <div className="data-head"><span>Метрика</span><span>Bitrix</span><span>ParkOps</span><span>Разница</span></div>
            <div className="data-row"><strong>Сделки / записи</strong><span>148</span><span>177</span><strong>+29</strong></div>
            <div className="data-row"><strong>Raw pipeline</strong><span>23,81 млн ₽</span><span>≈25 млн ₽</span><strong>≈+1,19 млн ₽</strong></div>
            <div className="data-row"><strong>Weighted</strong><span>14,18 млн ₽</span><span>≈16 млн ₽</span><strong>≈+1,82 млн ₽</strong></div>
            <div className="data-row"><strong>Календарь</strong><span>148 активных</span><span>153 события</span><strong>+5</strong></div>
          </div>
        </div>
        <aside className="note reveal"><strong>Как читать прирост</strong><p>Это валовый приток новых сделок, а не чистое изменение остатка pipeline. В выгрузке нет недельной истории изменения сумм и стадий, поэтому закрытые, проигранные и скорректированные сделки задним числом не образуют полноценный net-flow.</p></aside>
        <aside className="note reveal"><strong>Свежесть ParkOps</strong><p>Bitrix и сметы обновлены на 6 августа. Сверка ParkOps остаётся снимком от 4 августа, поэтому её расхождения нельзя считать синхронным сравнением до следующего чтения ParkOps.</p></aside>
      </section>

      <section className="section" id="capacity">
        <div className="section-heading reveal">
          <p className="eyebrow">Утилизация · 27 августа · 146 мероприятий</p>
          <h2>Утилизация площадок</h2>
          <p>По актуальной папке «АВГУСТ 2026»: 146 мероприятий, из них 103 в «Проведено». Расчётная загрузка — 184 слот-единицы из 1 271, или 14,48%. Включены 6 будущих предложений — это потенциальная, а не подтверждённая бронь. Айва — 8 слотов в день, шатёр FOOD — 6.</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="Теоретическая месячная ёмкость: сумма доступных слотов всех площадок за 31 день августа." tabIndex={0}><span>Всего слот-единиц</span><strong>1 271</strong><small>41 в день × 31 день</small></article>
          <article data-hint="Расчёт по 130 мероприятиям с определённой группой площадок, включая проведённые и будущие предложения. Не является подтверждением оплаты или точным почасовым расписанием." tabIndex={0}><span>Занято по сметам</span><strong>184</strong><small>14,48% · включая предложения</small></article>
          <article className="accent" data-hint="Занятые слот-единицы по субботам и воскресеньям, разделённые на доступную ёмкость выходных." tabIndex={0}><span>Выходные</span><strong>18,0%</strong><small>74 из 410</small></article>
          <article data-hint="Занятые слот-единицы с понедельника по пятницу, разделённые на доступную ёмкость будних дней." tabIndex={0}><span>Будни</span><strong>12,8%</strong><small>110 из 861</small></article>
        </div>
        <div className="chart-heading reveal"><h3>Утилизация по локациям</h3><p>Актуальные сметы на 27 августа, включая «Проведено» и будущие предложения. Занятые слот-единицы ÷ ёмкость августа × 100%.</p></div>
        <div className="location-grid reveal">
          {locations.map((location) => <article key={location.name} data-hint={location.detail} tabIndex={0}>
            <h3>{location.name}</h3>
            <strong>{(location.occupied / location.capacity * 100).toLocaleString("ru-RU", { maximumFractionDigits: 1 })}%</strong>
            <progress max={location.capacity} value={location.occupied} aria-label={location.name} />
            <p>{location.occupied} из {location.capacity} слот-единиц</p>
            <small>{location.detail}</small>
          </article>)}
        </div>
        <div className="chart-heading reveal"><h3>Пиковые даты по загрузке площадок</h3><p>Доля занятых слот-единиц от общей дневной ёмкости 41 слот</p></div>
        <div className="peak-grid reveal">
          {[['28 августа',58.5],['15 августа',43.9],['7 августа',36.6],['29 августа',34.1],['6 августа',29.3]].map(([d,v]) => <article key={String(d)} data-hint={`${d}: занято ${v}% доступной дневной ёмкости площадок по данным смет.`} tabIndex={0}><strong>{d}</strong><div className="util-track"><i style={{ "--bar": `${v}%` } as CSSProperties} /></div><span>{v}%</span></article>)}
        </div>
      </section>

      <footer><div><strong>Парк «Сказка» · отчёт продаж</strong><span>Bitrix · 26.08.2026 · сметы · 27.08.2026</span></div><span>Публичная версия без исходных выгрузок</span></footer>
    </main>
  );
}
