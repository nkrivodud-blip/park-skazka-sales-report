"use client";

import { useEffect, useState, type CSSProperties } from "react";

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
  ["20–26.07", 148], ["27.07–02.08", 152], ["03–09.08", 190, true],
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

const sources = [
  ["Веб-сайт", 986, 48.3], ["Звонок", 735, 36.0], ["MAX Wappi · отдел продаж", 123, 6.0],
  ["WAZZUP · WhatsApp", 53, 2.6], ["WAPPI · Telegram", 41, 2.0],
] as const;

const packages = [
  ["Весёлый старт", 36, 1_404_000], ["Сказочный калейдоскоп", 28, 2_573_000],
  ["Звёздный праздник", 2, 390_000], ["Доп. участник пакета", 1, 15_000],
] as const;

const addons = [
  ["Торты и сладкий сбор", 38, 302_650], ["Билеты и безлимитные абонементы", 23, 1_223_405],
  ["Фотограф", 13, 192_000], ["Сопровождение на аттракционах", 13, 518_000], ["Пиньята", 8, 44_000],
  ["Шоу-программы", 7, 398_500], ["Квесты", 7, 210_000], ["Шариковая дискотека", 6, 108_000],
  ["Шары и оформление", 4, 65_700], ["Тимбилдинг", 3, 780_000],
] as const;

const managers = [
  { name: "Кристина Могачева", direction: "B2B", worked: 377, leadsAugust: 50, dealConv: 22.0, paidConv: 32.0, deals: 11, sales: 1_835_230, avg: 166_839, plan: 10_000_000, planSales: 1_074_760, pipelineCount: 42, pipelineRaw: 11_765_431, pipelineWeighted: 6_974_387.9 },
  { name: "Яна Кузнецова", direction: "B2B", worked: 0, leadsAugust: 0, dealConv: 0, paidConv: 0, deals: 0, sales: 0, avg: 0, plan: 10_000_000, planSales: 0, pipelineCount: 3, pipelineRaw: 1_280_000, pipelineWeighted: 1_080_000 },
  { name: "Людмила Запорожец", direction: "B2C", worked: 320, leadsAugust: 27, dealConv: 44.4, paidConv: 51.9, deals: 12, sales: 1_842_180, avg: 153_515, plan: 12_006_578, planSales: 1_842_180, pipelineCount: 43, pipelineRaw: 5_343_660, pipelineWeighted: 3_952_254 },
  { name: "Дмитрий Григорьев", direction: "B2C", worked: 316, leadsAugust: 16, dealConv: 50.0, paidConv: 6.3, deals: 8, sales: 824_500, avg: 103_063, plan: 12_006_578, planSales: 824_500, pipelineCount: 2, pipelineRaw: 345_000, pipelineWeighted: 240_500 },
  { name: "Варвара Чугреева", direction: "B2C", worked: 94, leadsAugust: 26, dealConv: 11.5, paidConv: 26.9, deals: 3, sales: 167_960, avg: 55_987, plan: 12_006_578, planSales: 167_960, pipelineCount: 26, pipelineRaw: 2_340_580, pipelineWeighted: 1_529_522 },
  { name: "Лилия Рамазанова", direction: "B2C", worked: 89, leadsAugust: 40, dealConv: 0, paidConv: 10.0, deals: 0, sales: 0, avg: 0, plan: 12_006_578, planSales: 0, pipelineCount: 11, pipelineRaw: 1_040_030, pipelineWeighted: 817_527 },
  { name: "Татьяна Баландина", direction: "B2C", worked: 242, leadsAugust: 0, dealConv: 0, paidConv: 0, deals: 7, sales: 599_840, avg: 85_691, plan: null, planSales: 599_840, pipelineCount: 0, pipelineRaw: 0, pipelineWeighted: 0 },
  { name: "Наталья Криводуд", direction: "РОП", worked: 603, leadsAugust: 70, dealConv: 0, paidConv: 0, deals: 0, sales: 0, avg: 0, plan: null, planSales: 0, pipelineCount: 0, pipelineRaw: 0, pipelineWeighted: 0 },
] as const;

const pipelineStages = [
  ["Внесена предоплата", 37, 5_191_623, "90%"], ["Подготовка к мероприятию", 2, 3_425_491, "90%"],
  ["В работе", 50, 1_930_500, "по прогнозу"], ["Направлено КП", 5, 2_290_000, "по прогнозу"],
  ["Сделано предложение", 29, 1_086_725, "по прогнозу"], ["Договор и предоплата", 1, 450_000, "90%"],
  ["4 дня до банкета", 3, 219_852, "90%"],
] as const;

const forecastBuckets = [
  ["Верю, что закроется", 8, 1_242_000, 1_117_800, "90%"],
  ["Верю, но с рисками", 60, 6_928_850, 3_464_425, "50%"],
  ["Не верю", 15, 3_625_000, 725_000, "20%"],
] as const;

const money = (value: number) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(value);
const compactMoney = (value: number) => value === 0
  ? "0 ₽"
  : value >= 1_000_000
    ? `${(value / 1_000_000).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} млн ₽`
    : `${Math.round(value / 1_000).toLocaleString("ru-RU")} тыс. ₽`;

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">ПС</span><span>Продажи · август</span></a>
        <nav aria-label="Разделы отчёта">
          <a href="#leads">Лиды</a><a href="#managers">Менеджеры</a><a href="#pipeline">Pipeline</a><a href="#capacity">Площадки</a><a href="#packages">Пакеты</a>
        </nav>
      </header>

      <section className="hero reveal" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Отдел продаж · август 2026 · данные на 10 августа</p>
          <h1>Факт, предоплаты и pipeline собраны в одну картину.</h1>
          <p className="lead">
            В августе проведено 41 мероприятие на 5,27 млн ₽. Ещё 43 мероприятия имеют предоплату,
            а взвешенный pipeline составляет 14,59 млн ₽ при учёте прогнозов закрытия.
          </p>
          <div className="hero-actions"><a className="button primary" href="#pipeline">Смотреть сверку</a><a className="button ghost" href="#leads">Разобрать лиды</a></div>
        </div>
        <div className="hero-score">
          <span>Прогноз к цели 65 млн ₽</span>
          <strong><Counter value={22.5} suffix="%" decimals={1} /></strong>
          <div className="score-track" aria-hidden="true"><i style={{ width: "22.5%" }} /></div>
          <small>14,59 млн ₽ из 65 млн ₽</small>
        </div>
      </section>

      <section className="kpi-grid reveal" aria-label="Ключевые показатели">
        <article className="kpi" data-hint="Сумма успешно проведённых августовских мероприятий после удаления дублей." tabIndex={0}><span>Проведено</span><strong><Counter value={5.27} suffix=" млн ₽" decimals={2} /></strong><small>41 сделка · фактическая выручка</small></article>
        <article className="kpi accent" data-hint="Взвешенная сумма предоплаченных и прогнозных сделок августа: предоплаченные — 90%, прогнозные — по полю «Прогноз закрытия»." tabIndex={0}><span>Взвешенный pipeline</span><strong><Counter value={14.59} suffix=" млн ₽" decimals={2} /></strong><small>127 сделок в контуре</small></article>
        <article className="kpi" data-hint="Мероприятия на стадиях с внесённой предоплатой или начавшейся операционной подготовкой." tabIndex={0}><span>Предоплачено</span><strong><Counter value={43} /></strong><small>10,32 млн ₽ raw · 9,29 млн ₽ weighted</small></article>
        <article className="kpi danger" data-hint="Лиды, созданные с 1 по 9 августа после удаления дублей. От них рассчитана августовская конверсия в предоплату и успешную сделку." tabIndex={0}><span>Лиды августа</span><strong><Counter value={229} /></strong><small>18,8% в предоплату · 17,9% в успех</small></article>
      </section>

      <section className="section" id="leads">
        <div className="section-heading reveal">
          <p className="eyebrow">Лиды · 1 мая — 9 августа</p>
          <h2>20,2 лида в день. В августе 18,8% лидов дошли до предоплаты.</h2>
          <p>В новой выгрузке 2 041 лид, дублей с причиной «Дубль» не найдено. Августовская конверсия считается по созданным в августе лидам и сделкам с датой мероприятия в августе.</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="2 041 очищенный лид, разделённый на 101 календарный день с 1 мая по 9 августа." tabIndex={0}><span>Среднее в день</span><strong>20,2</strong><small>101 календарный день</small></article>
          <article data-hint="Среднедневной поток лидов, пересчитанный на семь календарных дней." tabIndex={0}><span>Среднее в неделю</span><strong>141,5</strong><small>week-equivalent</small></article>
          <article className="accent" data-hint="43 сделки на стадиях внесённой предоплаты и операционной подготовки, разделённые на 229 лидов, созданных в августе." tabIndex={0}><span>Конверсия в предоплату</span><strong>18,8%</strong><small>43 из 229 лидов августа</small></article>
          <article data-hint="41 успешно проведённое августовское мероприятие, разделённое на 229 лидов, созданных в августе." tabIndex={0}><span>Конверсия в успех</span><strong>17,9%</strong><small>41 из 229 лидов августа</small></article>
        </div>
        <div className="chart-heading reveal"><h3>Очищенные лиды по неделям</h3><p>Количество новых лидов после удаления дублей · звёздочкой отмечены неполные недели</p></div>
        <div className="week-chart reveal" aria-label="Очищенные лиды по неделям">
          {weekly.map(([label, value, partial]) => <div className="week-col" key={label}><div className="week-value">{value}</div><div className="week-track"><i style={{ "--height": `${value / 204 * 100}%` } as CSSProperties} /></div><small>{label}{partial ? "*" : ""}</small></div>)}
        </div>
        <div className="table-card reveal">
          <div className="table-title"><div><h3>Топ-5 источников</h3><p>Источники в этой выгрузке относятся ко всему периоду с мая по 9 августа.</p></div><span>2 041 лид</span></div>
          <div className="data-table source-table">
            <div className="data-head"><span>Источник</span><span>Лиды</span><span>Доля</span></div>
            {sources.map(([name, count, share]) => <div className="data-row" key={name}><strong>{name}</strong><span>{count}</span><strong>{share}%</strong></div>)}
          </div>
        </div>
        <aside className="note reveal"><strong>Ограничение конверсии</strong><p>В выгрузках нет прямого Lead ID → Deal ID. Поэтому 18,8% и 17,9% — управленческая конверсия по числу августовских сделок из соответствующих стадий, а не сквозная CRM-атрибуция по телефону.</p></aside>
      </section>

      <section className="section" id="managers">
        <div className="section-heading reveal">
          <p className="eyebrow">Отдел продаж · факт</p>
          <h2>Проведено 41 мероприятие на 5,27 млн ₽.</h2>
          <p>Факт считается только по стадии «Сделка успешна» и дате мероприятия в августе. План — из файла распределения: 68,03 млн ₽ всего, 48,03 млн ₽ B2C и 20,00 млн ₽ B2B.</p>
        </div>
        <div className="capacity-summary reveal">
          <article className="accent" data-hint="Сумма успешно проведённых августовских мероприятий. План команды — 68,03 млн ₽." tabIndex={0}><span>Проведено</span><strong>5,27 млн ₽</strong><small>41 сделка · выполнение 7,7%</small><div className="plan-track" aria-label="Выполнение общего плана 7,7%"><i style={{ "--plan": "7.7%" } as CSSProperties} /></div><em className="plan-gap">Осталось добрать 62,76 млн ₽</em></article>
          <article data-hint="Фактические успешные сделки B2C с датой мероприятия в августе. План B2C — 48,03 млн ₽." tabIndex={0}><span>B2C</span><strong>4,19 млн ₽</strong><small>39 сделок · выполнение 8,7%</small><div className="plan-track" aria-label="Выполнение плана B2C 8,7%"><i style={{ "--plan": "8.7%" } as CSSProperties} /></div><em className="plan-gap">Осталось добрать 43,83 млн ₽</em></article>
          <article data-hint="Фактические успешные сделки B2B с датой мероприятия в августе. План B2B — 20,00 млн ₽." tabIndex={0}><span>B2B</span><strong>1,07 млн ₽</strong><small>2 сделки · выполнение 5,4%</small><div className="plan-track" aria-label="Выполнение плана B2B 5,4%"><i style={{ "--plan": "5.4%" } as CSSProperties} /></div><em className="plan-gap">Осталось добрать 18,93 млн ₽</em></article>
          <article data-hint="Фактическая сумма проведённых мероприятий, разделённая на 41 успешную сделку." tabIndex={0}><span>Средний чек</span><strong>128,5 тыс. ₽</strong><small>только стадия «Сделка успешна»</small></article>
        </div>
        <div className="table-card reveal">
          <div className="table-title">
            <div><h3>Планы и выполнение по менеджерам</h3><p>Планы — из файла «Распределение плана.xlsx»; продажи — только успешные сделки августа. Конверсия — от лидов, созданных в августе.</p></div>
            <span>План команды 68,03 млн ₽</span>
          </div>
          <div className="data-table manager-table">
            <div className="data-head"><span>Менеджер</span><span>Направление</span><span>Лиды периода</span><span>Успех / предоплата августа</span><span>Проведено</span><span>План августа</span><span>Выполнение</span><span>Осталось добрать</span></div>
            {managers.map((manager) => {
              const execution = manager.plan ? manager.planSales / manager.plan * 100 : null;
              const gap = manager.plan ? Math.max(manager.plan - manager.planSales, 0) : null;
              return (
                <div className="data-row" key={manager.name}>
                  <strong>{manager.name}</strong>
                  <span><b className="direction-tag">{manager.direction}</b></span>
                  <span className="metric-value">{manager.worked}<small>август: {manager.leadsAugust}</small></span>
                  <span className="metric-value">{manager.dealConv.toLocaleString("ru-RU")}% / {manager.paidConv.toLocaleString("ru-RU")}%</span>
                  <span><strong>{compactMoney(manager.sales)}</strong><small>{manager.deals} сделок · чек {compactMoney(manager.avg)}</small>{manager.planSales !== manager.sales && <small>В план B2B: {compactMoney(manager.planSales)}</small>}</span>
                  <span className="metric-value">{manager.plan ? compactMoney(manager.plan) : "—"}</span>
                  <span className="completion">{execution !== null ? <><strong>{execution.toLocaleString("ru-RU", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</strong><span className="manager-progress" aria-label={`Выполнение плана ${execution.toFixed(1)}%`}><i style={{ "--plan": `${Math.min(execution, 100)}%` } as CSSProperties} /></span></> : <strong>—</strong>}</span>
                  <span className={`gap-amount${gap === null ? " no-plan" : ""}`}>{gap !== null ? compactMoney(gap) : "План не назначен"}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="pipeline">
        <div className="section-heading reveal">
          <p className="eyebrow">Pipeline на август</p>
          <h2>14,59 млн ₽ взвешенного pipeline на 127 сделках.</h2>
          <p>В контур включены предоплаченные мероприятия с вероятностью 90% и сделки «В работе» / «Сделано предложение» / «Направлено КП» с вероятностью из поля «Прогноз закрытия».</p>
        </div>
        <div className="capacity-summary reveal">
          <article className="accent" data-hint="Сумма всех сделок pipeline до применения вероятностей: предоплата, операционная подготовка и прогнозные стадии." tabIndex={0}><span>Raw pipeline</span><strong>22,11 млн ₽</strong><small>127 сделок · B2C 11,73 · B2B 10,39</small></article>
          <article data-hint="Взвешенный pipeline: предоплаченные стадии умножены на 90%, прогнозные стадии — на значение поля «Прогноз закрытия»." tabIndex={0}><span>Взвешенный pipeline</span><strong>14,59 млн ₽</strong><small>B2C 8,34 · B2B 6,26</small></article>
          <article data-hint="Предоплаченные и операционные стадии: 43 сделки на 10,32 млн ₽ raw, все с вероятностью 90%." tabIndex={0}><span>Предоплачено</span><strong>43 сделки</strong><small>10,32 млн ₽ raw · 9,29 млн ₽ weighted</small></article>
          <article data-hint="Сделки в работе, с предложением или направленным КП: 84 сделки на 11,39 млн ₽ raw, взвешены по прогнозу закрытия." tabIndex={0}><span>Прогнозные стадии</span><strong>84 сделки</strong><small>11,39 млн ₽ raw · 5,31 млн ₽ weighted</small></article>
        </div>
        <div className="dual-tables reveal">
          <div className="table-card">
            <div className="table-title"><div><h3>Стадии pipeline</h3><p>Сумма в таблице уже взвешена по вероятности закрытия.</p></div><span>14,59 млн ₽</span></div>
            <div className="data-table source-table"><div className="data-head"><span>Стадия</span><span>Сделок</span><span>Weighted</span></div>{pipelineStages.map(([stage, count, weighted, probability]) => <div className="data-row" key={stage}><strong>{stage}<small>{probability}</small></strong><span>{count}</span><strong>{compactMoney(weighted)}</strong></div>)}</div>
          </div>
          <div className="table-card">
            <div className="table-title"><div><h3>Прогноз закрытия</h3><p>Только стадии «В работе», «Сделано предложение» и «Направлено КП».</p></div><span>5,31 млн ₽ weighted</span></div>
            <div className="data-table comparison-table"><div className="data-head"><span>Оценка</span><span>Сделок</span><span>Raw</span><span>Weighted</span></div>{forecastBuckets.map(([label, count, raw, weighted, probability]) => <div className="data-row" key={label}><strong>{label}<small>{probability}</small></strong><span>{count}</span><span>{compactMoney(raw)}</span><strong>{compactMoney(weighted)}</strong></div>)}</div>
          </div>
        </div>
        <div className="table-card reveal">
          <div className="table-title"><div><h3>Pipeline по менеджерам</h3><p>Raw и weighted суммы по текущему владельцу сделки.</p></div><span>127 сделок</span></div>
          <div className="data-table source-table"><div className="data-head"><span>Менеджер</span><span>Сделок</span><span>Weighted</span></div>{managers.filter((manager) => manager.pipelineCount > 0).map((manager) => <div className="data-row" key={`pipeline-${manager.name}`}><strong>{manager.name}<small>{manager.direction}</small></strong><span>{manager.pipelineCount}</span><strong>{compactMoney(manager.pipelineWeighted)}<small>raw {compactMoney(manager.pipelineRaw)}</small></strong></div>)}</div>
        </div>
        <aside className="note reveal"><strong>Правило расчёта</strong><p>Сделка успешна не входит в pipeline — она отражена в факте. Предоплаченные мероприятия остаются в pipeline до проведения и считаются с вероятностью 90%; прогнозные сделки используют только заполненное поле «Прогноз закрытия».</p></aside>
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
          <p className="eyebrow">Утилизация по 89 уникальным сметам</p>
          <h2>Дефицита площадок нет. Выходные загружены в 2 раза сильнее будней.</h2>
          <p>Нижняя граница месяца — 91 занятая слот-единица из 1 271, или 7,16%. Выходные: 10,49%; будни: 5,57%. Учтены уточнения РОП: Айва — 8 слотов в день, шатёр FOOD — 6.</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="Теоретическая месячная ёмкость: сумма доступных слотов всех площадок за 31 день августа." tabIndex={0}><span>Всего слот-единиц</span><strong>1 271</strong><small>41 в день × 31 день</small></article>
          <article data-hint="Минимально подтверждённое число занятых слот-единиц по 89 уникальным сметам. Неопределённые локации не завышают показатель." tabIndex={0}><span>Занято по сметам</span><strong>91</strong><small>нижняя граница</small></article>
          <article className="accent" data-hint="Занятые слот-единицы по субботам и воскресеньям, разделённые на доступную ёмкость выходных." tabIndex={0}><span>Выходные</span><strong>10,5%</strong><small>43 из 410</small></article>
          <article data-hint="Занятые слот-единицы с понедельника по пятницу, разделённые на доступную ёмкость будних дней." tabIndex={0}><span>Будни</span><strong>5,6%</strong><small>48 из 861</small></article>
        </div>
        <div className="chart-heading reveal"><h3>Пиковые даты по загрузке площадок</h3><p>Доля занятых слот-единиц от общей дневной ёмкости 41 слот</p></div>
        <div className="peak-grid reveal">
          {[['22 августа',29.3],['28 августа',22.0],['1 августа',17.1],['3 августа',17.1],['4 августа',9.8]].map(([d,v]) => <article key={String(d)} data-hint={`${d}: занято ${v}% доступной дневной ёмкости площадок по данным смет.`} tabIndex={0}><strong>{d}</strong><div className="util-track"><i style={{ "--bar": `${v}%` } as CSSProperties} /></div><span>{v}%</span></article>)}
        </div>
        <aside className="note reveal"><strong>Правило кластера Лофт</strong><p>Бриф «Лофт с беседками» блокирует Лофт и все пять беседок на оба дневных слота: 11 слот-единиц за день. С учётом этого кластер занимает 18 из 341 слот-единицы в августе, или 5,3%.</p></aside>
        <aside className="note reveal"><strong>28 августа · весь Айва-парк</strong><p>В смете на 28 августа указано бронирование всего Айва-парка. В расчёте занятости это 8 слот-единиц за день, а не одна карточка мероприятия.</p></aside>
      </section>

      <section className="section" id="packages">
        <div className="section-heading reveal">
          <p className="eyebrow">Пакеты и допродажи</p>
          <h2>Допродажи увеличивают базовую цену пакета в среднем на 42,0%.</h2>
          <p>Пакетные строки найдены в 66 сметах. В 47 из них есть допродажи на 1,84 млн ₽: 27,9 тыс. ₽ на каждое пакетное событие или 39,1 тыс. ₽ среди событий с фактической допродажей.</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="Количество уникальных смет, в которых обнаружена строка основного пакетного предложения." tabIndex={0}><span>Пакетных событий</span><strong>66</strong><small>74,2% смет</small></article>
          <article data-hint="Сумма строк основных пакетов во всех обновлённых сметах, без учёта дополнительных услуг." tabIndex={0}><span>Пакетная выручка</span><strong>4,38 млн ₽</strong><small>по пакетным строкам</small></article>
          <article className="accent" data-hint="Стоимость дополнительных продаж в пакетных сметах относительно стоимости самих пакетов." tabIndex={0}><span>Средний uplift</span><strong>42,0%</strong><small>к цене пакета</small></article>
          <article data-hint="Средняя итоговая сумма сметы среди событий с пакетным предложением; медиана показывает типичный центр без влияния крупных заказов." tabIndex={0}><span>Средняя полная смета</span><strong>119,4 тыс. ₽</strong><small>медиана 105,7 тыс. ₽</small></article>
        </div>
        <div className="dual-tables reveal">
          <div className="table-card"><div className="table-title"><div><h3>Пакетные семейства</h3></div></div><div className="data-table source-table"><div className="data-head"><span>Пакет</span><span>Событий</span><span>Сумма</span></div>{packages.map(([n,e,a])=><div className="data-row" key={n}><strong>{n}</strong><span>{e}</span><span>{money(a)}</span></div>)}</div></div>
          <div className="table-card"><div className="table-title"><div><h3>Что чаще всего допродают</h3><p>Рейтинг по количеству уникальных событий; сумма указана справочно.</p></div></div><div className="data-table source-table"><div className="data-head"><span>Услуга</span><span>Событий</span><span>Сумма</span></div>{addons.map(([n,e,a])=><div className="data-row" key={n}><strong>{n}</strong><span>{e}</span><span>{money(a)}</span></div>)}</div></div>
        </div>
        <aside className="note reveal"><strong>Контроль формул</strong><p>Ранее найденные ошибки subtotal в двух сметах исправлены. Активных замечаний по этим формулам в отчёте больше нет.</p></aside>
      </section>

      <footer><div><strong>Парк «Сказка» · отчёт продаж</strong><span>Bitrix + сметы · 10.08.2026 · ParkOps 04.08.2026</span></div><span>Публичная версия без исходных выгрузок</span></footer>
    </main>
  );
}
