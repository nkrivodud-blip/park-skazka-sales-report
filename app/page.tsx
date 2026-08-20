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
  ["10.08", 27], ["11.08", 17], ["12.08", 23], ["13.08", 19],
  ["14.08", 15], ["15.08", 13], ["16.08", 10],
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
  ["Веб-сайт", 43, 34.7], ["Звонок", 42, 33.9], ["WAPPI TG sales", 15, 12.1],
  ["MAX Wappi · отдел продаж", 13, 10.5], ["WAPPI WA sales", 4, 3.2],
] as const;

const managers = [
  { name: "Александр Поленко", direction: "B2C", total: 1, successConv: 0, prepaidConv: 0, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Варвара Чугреева", direction: "B2C", total: 51, successConv: 21.6, prepaidConv: 7.8, wonCount: 11, wonSum: 908_520, wonAvg: 82_593, activeCount: 12, activeRaw: 695_000, activeWeighted: 329_500, activeAvg: 57_917, prepaidCount: 4, prepaidSum: 486_940, prepaidAvg: 121_735 },
  { name: "Дмитрий Григорьев", direction: "B2C", status: "увольнение 14.08", total: 36, successConv: 22.2, prepaidConv: 2.8, wonCount: 8, wonSum: 824_500, wonAvg: 103_062, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 1, prepaidSum: 245_000, prepaidAvg: 245_000 },
  { name: "Кристина Могачева", direction: "B2B", total: 38, successConv: 7.9, prepaidConv: 2.6, wonCount: 3, wonSum: 1_574_760, wonAvg: 524_920, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 1, prepaidSum: 528_800, prepaidAvg: 528_800 },
  { name: "Кристина Могачева", direction: "B2C", total: 78, successConv: 24.4, prepaidConv: 16.7, wonCount: 19, wonSum: 1_574_330, wonAvg: 82_859, activeCount: 8, activeRaw: 620_000, activeWeighted: 276_500, activeAvg: 77_500, prepaidCount: 13, prepaidSum: 1_391_130, prepaidAvg: 107_010 },
  { name: "Лилия Рамазанова", direction: "B2C", total: 38, successConv: 10.5, prepaidConv: 21.1, wonCount: 4, wonSum: 607_230, wonAvg: 151_808, activeCount: 6, activeRaw: 615_000, activeWeighted: 306_000, activeAvg: 102_500, prepaidCount: 8, prepaidSum: 465_120, prepaidAvg: 58_140 },
  { name: "Людмила Запорожец", direction: "B2B", total: 3, successConv: 0, prepaidConv: 0, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Людмила Запорожец", direction: "B2C", total: 132, successConv: 15.2, prepaidConv: 6.8, wonCount: 20, wonSum: 2_858_950, wonAvg: 142_948, activeCount: 17, activeRaw: 1_122_750, activeWeighted: 583_975, activeAvg: 66_044, prepaidCount: 9, prepaidSum: 2_620_270, prepaidAvg: 291_141 },
  { name: "Наталья Криводуд", direction: "B2B", total: 2, successConv: 0, prepaidConv: 0, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Наталья Криводуд", direction: "B2C", total: 3, successConv: 0, prepaidConv: 0, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Татьяна Баландина", direction: "B2C", status: "уволена", total: 29, successConv: 24.1, prepaidConv: 0, wonCount: 7, wonSum: 599_840, wonAvg: 85_691, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 0, prepaidSum: 0, prepaidAvg: 0 },
  { name: "Яна Кузнецова", direction: "B2B", total: 14, successConv: 0, prepaidConv: 7.1, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 0, activeRaw: 0, activeWeighted: 0, activeAvg: 0, prepaidCount: 1, prepaidSum: 500_000, prepaidAvg: 500_000 },
  { name: "Яна Кузнецова", direction: "B2C", total: 7, successConv: 0, prepaidConv: 28.6, wonCount: 0, wonSum: 0, wonAvg: 0, activeCount: 2, activeRaw: 335_000, activeWeighted: 287_500, activeAvg: 167_500, prepaidCount: 2, prepaidSum: 99_140, prepaidAvg: 49_570 },
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
          <p className="eyebrow">Отдел продаж · август 2026 · данные на 20 августа</p>
          <h1>Факт, предоплаты и pipeline собраны в одну картину.</h1>
          <p className="lead">
            В августе закрыто 72 сделки на 8,95 млн ₽. Ещё 39 сделок находятся на предоплаченных стадиях,
            а взвешенный pipeline по актуальным прогнозам составляет 1,78 млн ₽.
          </p>
          <div className="hero-actions"><a className="button primary" href="#pipeline">Смотреть сверку</a><a className="button ghost" href="#leads">Разобрать лиды</a></div>
        </div>
        <div className="hero-score">
          <span>Прогноз к цели 65 млн ₽</span>
          <strong><Counter value={23.5} suffix="%" decimals={1} /></strong>
          <div className="score-track" aria-hidden="true"><i style={{ width: "23.5%" }} /></div>
          <small>15,28 млн ₽ из 65 млн ₽ · факт + предоплаты</small>
        </div>
      </section>

      <section className="kpi-grid reveal" aria-label="Ключевые показатели">
        <article className="kpi" data-hint="Сумма и количество сделок на стадии «Сделка успешна» в августовских выгрузках B2C и B2B." tabIndex={0}><span>Факт закрытых</span><strong><Counter value={8.95} suffix=" млн ₽" decimals={2} /></strong><small>72 сделки · фактическая выручка</small><div className="kpi-average-values"><span>B2C <b>7,37 млн ₽ · 69</b></span><span>B2B <b>1,57 млн ₽ · 3</b></span></div></article>
        <article className="kpi" data-hint="Сделки на предоплаченных и операционных стадиях: B2C — «Внесена предоплата», «4 дня до банкета», «1 день до банкета»; B2B — «Договор и предоплата», «Подготовка к мероприятию»." tabIndex={0}><span>Предоплаченные сделки</span><strong><Counter value={6.34} suffix=" млн ₽" decimals={2} /></strong><small>39 сделок</small><div className="kpi-average-values"><span>B2C <b>5,31 млн ₽ · 37</b></span><span>B2B <b>1,03 млн ₽ · 2</b></span></div></article>
        <article className="kpi accent" data-hint="Только сделки на стадиях «В работе» и «Сделано предложение» для B2C, «В работе» и «Направлено КП» для B2B, с заполненным прогнозом закрытия. Вес прогноза: 90%, 50% или 20%." tabIndex={0}><span>Взвешенный pipeline</span><strong><Counter value={1.78} suffix=" млн ₽" decimals={2} /></strong><small>45 сделок с актуальным прогнозом</small><div className="kpi-average-values"><span>B2C <b>1,78 млн ₽ · 45</b></span><span>B2B <b>0 ₽ · 0</b></span></div></article>
        <article className="kpi" data-hint="Полная сумма тех же сделок pipeline до применения веса прогноза закрытия." tabIndex={0}><span>Сырой pipeline</span><strong><Counter value={3.39} suffix=" млн ₽" decimals={2} /></strong><small>45 сделок с актуальным прогнозом</small><div className="kpi-average-values"><span>B2C <b>3,39 млн ₽ · 45</b></span><span>B2B <b>0 ₽ · 0</b></span></div></article>
      </section>

      <section className="section" id="leads">
        <div className="section-heading reveal">
          <p className="eyebrow">Лиды · 10–16 августа</p>
          <h2>17,7 лида в день по выбранной команде.</h2>
          <p>У семи указанных ответственных найдено 157 лидов. Исключены 33 лида с причиной отмены «дубль»: осталось 124, из них 94 находятся на стадии «Качественный лид».</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="124 очищенных лида за семь календарных дней с 10 по 16 августа." tabIndex={0}><span>Среднее в день</span><strong>17,7</strong><small>124 лида · 7 дней</small></article>
          <article data-hint="Количество лидов семи выбранных ответственных после удаления дублей." tabIndex={0}><span>Очищенные лиды</span><strong>124</strong><small>из 157 исходных</small></article>
          <article className="accent" data-hint="94 из 124 очищенных лидов находятся на стадии «Качественный лид»." tabIndex={0}><span>Качественные лиды</span><strong>75,8%</strong><small>94 из 124</small></article>
          <article data-hint="Среди лидов выбранной команды исключено 33 записи, где в причине отмены указан дубль." tabIndex={0}><span>Удалено дублей</span><strong>33</strong><small>21,0% выборки</small></article>
        </div>
        <div className="chart-heading reveal"><h3>Очищенные лиды по дням</h3><p>Только семь выбранных ответственных · дубли по причине отмены исключены</p></div>
        <div className="week-chart reveal" aria-label="Очищенные лиды по дням">
          {weekly.map(([label, value]) => <div className="week-col" key={label}><div className="week-value">{value}</div><div className="week-track"><i style={{ "--height": `${value / 27 * 100}%` } as CSSProperties} /></div><small>{label}</small></div>)}
        </div>
        <div className="table-card reveal">
          <div className="table-title"><div><h3>Топ-5 источников · 10–16 августа</h3><p>Только выбранная команда, после исключения дублей по причине отмены.</p></div><span>124 лида</span></div>
          <div className="data-table source-table">
            <div className="data-head"><span>Источник</span><span>Лиды</span><span>Доля</span></div>
            {sources.map(([name, count, share]) => <div className="data-row" key={name}><strong>{name}</strong><span>{count}</span><strong>{share}%</strong></div>)}
          </div>
        </div>
        <aside className="note reveal"><strong>Периметр выборки</strong><p>Наталья Криводуд, Людмила Запорожец, Лилия Рамазанова, Дмитрий Григорьев, Кристина Могачева, Варвара Чугреева и Яна Кузнецова. Удалены только лиды, где поле «Причина отмены» содержит «дубль».</p></aside>
      </section>

      <section className="section" id="managers">
        <div className="section-heading reveal">
          <p className="eyebrow">Отдел продаж · факт</p>
          <h2>Проведено 72 мероприятия на 8,95 млн ₽.</h2>
          <p>Факт считается по стадии «Сделка успешна» в августовских выгрузках. Конверсия менеджеров ниже рассчитана от всех сделок соответствующего направления в выборке.</p>
        </div>
        <div className="capacity-summary reveal">
          <article className="accent" data-hint="Сумма успешно проведённых августовских мероприятий B2B и B2C." tabIndex={0}><span>Проведено</span><strong>8,95 млн ₽</strong><small>72 сделки · средний чек 124,3 тыс. ₽</small></article>
          <article data-hint="Успешные сделки воронки «Дни рождения»." tabIndex={0}><span>B2C</span><strong>7,37 млн ₽</strong><small>69 сделок · чек 106,9 тыс. ₽</small></article>
          <article data-hint="Успешные сделки воронки «Корпоративные мероприятия»." tabIndex={0}><span>B2B</span><strong>1,57 млн ₽</strong><small>3 сделки · чек 524,9 тыс. ₽</small></article>
          <article data-hint="Сумма факта и предоплаченных сделок относительно цели 65 млн ₽." tabIndex={0}><span>Прогноз к цели</span><strong>23,5%</strong><small>15,28 млн ₽ · факт + предоплаты</small></article>
        </div>
        <div className="table-card reveal">
          <div className="table-title">
            <div><h3>Показатели по менеджерам · B2B и B2C отдельно</h3><p>Конверсия — от всех сделок менеджера в августовской выборке. В работе — только согласованные стадии с заполненным прогнозом.</p></div>
            <span>432 сделки в двух выгрузках</span>
          </div>
          <div className="data-table manager-table">
            <div className="data-head"><span>Менеджер</span><span>Напр.</span><span>Конверсия</span><span>Проведено</span><span>В работе</span><span>Предоплачено</span></div>
            {managers.map((manager) => {
              return (
                <div className="data-row" key={`${manager.name}-${manager.direction}`}>
                  <strong>{manager.name}{("status" in manager && manager.status) && <small className="manager-status">{manager.status}</small>}</strong>
                  <span><b className="direction-tag">{manager.direction}</b></span>
                  <span className="metric-value">Успех {manager.successConv.toLocaleString("ru-RU")}%<small>Предоплата {manager.prepaidConv.toLocaleString("ru-RU")}% · база {manager.total}</small></span>
                  <span><strong>{compactMoney(manager.wonSum)}</strong><small>{manager.wonCount} шт. · чек {compactMoney(manager.wonAvg)}</small></span>
                  <span><strong>{compactMoney(manager.activeWeighted)} weighted</strong><small>{manager.activeCount} шт. · raw {compactMoney(manager.activeRaw)}</small><small>чек raw {compactMoney(manager.activeAvg)}</small></span>
                  <span><strong>{compactMoney(manager.prepaidSum)}</strong><small>{manager.prepaidCount} шт. · чек {compactMoney(manager.prepaidAvg)}</small></span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="pipeline">
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
          <p className="eyebrow">Утилизация по 140 уникальным сметам</p>
          <h2>Дефицита площадок нет. Выходные загружены в 2,3 раза сильнее будней.</h2>
          <p>Нижняя граница месяца — 141 занятая слот-единица из 1 271, или 11,09%. Выходные: 18,05%; будни: 7,78%. Учтены основная папка, «Предложения» и «Проведено», а также уточнения РОП: Айва — 8 слотов в день, шатёр FOOD — 6.</p>
        </div>
        <div className="capacity-summary reveal">
          <article data-hint="Теоретическая месячная ёмкость: сумма доступных слотов всех площадок за 31 день августа." tabIndex={0}><span>Всего слот-единиц</span><strong>1 271</strong><small>41 в день × 31 день</small></article>
          <article data-hint="Минимально подтверждённое число занятых слот-единиц по 140 уникальным сметам, включая папку «Проведено». Неопределённые локации не завышают показатель." tabIndex={0}><span>Занято по сметам</span><strong>141</strong><small>нижняя граница</small></article>
          <article className="accent" data-hint="Занятые слот-единицы по субботам и воскресеньям, разделённые на доступную ёмкость выходных." tabIndex={0}><span>Выходные</span><strong>18,0%</strong><small>74 из 410</small></article>
          <article data-hint="Занятые слот-единицы с понедельника по пятницу, разделённые на доступную ёмкость будних дней." tabIndex={0}><span>Будни</span><strong>7,8%</strong><small>67 из 861</small></article>
        </div>
        <div className="chart-heading reveal"><h3>Пиковые даты по загрузке площадок</h3><p>Доля занятых слот-единиц от общей дневной ёмкости 41 слот</p></div>
        <div className="peak-grid reveal">
          {[['15 августа',43.9],['22 августа',39.0],['28 августа',22.0],['29 августа',17.1],['30 августа',17.1]].map(([d,v]) => <article key={String(d)} data-hint={`${d}: занято ${v}% доступной дневной ёмкости площадок по данным смет.`} tabIndex={0}><strong>{d}</strong><div className="util-track"><i style={{ "--bar": `${v}%` } as CSSProperties} /></div><span>{v}%</span></article>)}
        </div>
        <aside className="note reveal"><strong>Правило кластера Лофт</strong><p>Бриф «Лофт с беседками» блокирует Лофт и все пять беседок на оба дневных слота: 11 слот-единиц за день. С учётом этого кластер занимает 25 из 341 слот-единицы в августе, или 7,3%.</p></aside>
        <aside className="note reveal"><strong>28 августа · весь Айва-парк</strong><p>В смете на 28 августа указано бронирование всего Айва-парка. В расчёте занятости это 8 слот-единиц за день, а не одна карточка мероприятия.</p></aside>
      </section>

      <footer><div><strong>Парк «Сказка» · отчёт продаж</strong><span>Bitrix + сметы + лиды · 20.08.2026 · ParkOps 04.08.2026</span></div><span>Публичная версия без исходных выгрузок</span></footer>
    </main>
  );
}
