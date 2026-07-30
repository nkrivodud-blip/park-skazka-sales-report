"use client";

import { useEffect, useMemo, useState } from "react";

const weeks = [
  { date: "20 апр", leads: 119, success: 18, revenue: 3037115, conversion: 26.9 },
  { date: "27 апр", leads: 91, success: 14, revenue: 1380210, conversion: 25.9 },
  { date: "4 мая", leads: 98, success: 20, revenue: 2925776, conversion: 35.1 },
  { date: "11 мая", leads: 109, success: 25, revenue: 3785810, conversion: 37.9 },
  { date: "18 мая", leads: 128, success: 18, revenue: 2550160, conversion: 28.6 },
  { date: "25 мая", leads: 108, success: 15, revenue: 2489210, conversion: 23.4 },
  { date: "1 июн", leads: 111, success: 15, revenue: 1898780, conversion: 23.8 },
  { date: "8 июн", leads: 107, success: 19, revenue: 2685620, conversion: 29.2 },
  { date: "15 июн", leads: 109, success: 15, revenue: 2142560, conversion: 23.1 },
  { date: "22 июн", leads: 126, success: 21, revenue: 5516903, conversion: 34.4 },
  { date: "29 июн", leads: 132, success: 18, revenue: 1960300, conversion: 29.5 },
  { date: "6 июл", leads: 148, success: 17, revenue: 1446440, conversion: 22.7 },
  { date: "13 июл", leads: 163, success: 10, revenue: 1348130, conversion: 18.9 },
  { date: "20 июл", leads: 122, success: 5, revenue: 499850, conversion: 9.8 },
];

const managers = [
  { name: "Кристина Могачева", leads: 348, quality: 72.7, wins: 66 },
  { name: "Людмила Запорожец", leads: 268, quality: 59.3, wins: 46 },
  { name: "Дмитрий Григорьев", leads: 250, quality: 60, wins: 35 },
  { name: "Наталья Криводуд", leads: 570, quality: 27.7, wins: 34 },
];

const reasons = [
  { label: "Не дозвонились, более 3 касаний", value: 126 },
  { label: "Выбрали другой формат", value: 90 },
  { label: "Погода", value: 66 },
  { label: "Другое", value: 33 },
  { label: "Дорого", value: 29 },
];

const money = (value: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value);

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{money(shown)}{suffix}</>;
}

export default function Home() {
  const [segment, setSegment] = useState<"all" | "b2c" | "b2b">("all");
  const segmentData = useMemo(() => ({
    all: { deals: 865, wins: 230, revenue: 33666864, conversion: 26.6 },
    b2c: { deals: 794, wins: 223, revenue: 27084491, conversion: 28.1 },
    b2b: { deals: 71, wins: 7, revenue: 6582373, conversion: 9.9 },
  }[segment]), [segment]);
  const maxRevenue = Math.max(...weeks.map((item) => item.revenue));

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar reveal">
        <a className="brand" href="#top" aria-label="Парк Сказка — отчёт по продажам">
          <span className="brand-mark">С</span>
          <span>Парк Сказка <small>sales intelligence</small></span>
        </a>
        <div className="period"><span className="live-dot" /> 21 апреля — 26 июля 2026</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal delay-1">
          <p className="eyebrow">Продажи / B2B + B2C</p>
          <h1>Траектория<br /><span>продаж</span></h1>
          <p className="hero-note">Когортный отчёт по полному циклу: от первого лида до оплаты. Дубли исключены.</p>
        </div>
        <div className="orbit-card reveal delay-2">
          <div className="orbit">
            <div className="orbit-ring ring-one" />
            <div className="orbit-ring ring-two" />
            <div className="orbit-core">
              <strong><AnimatedNumber value={33666864} suffix=" ₽" /></strong>
              <span>выручка периода</span>
            </div>
            <span className="orbit-label label-a">1 671 лид</span>
            <span className="orbit-label label-b">230 продаж</span>
            <span className="orbit-label label-c">26,6% успех</span>
          </div>
        </div>
      </section>

      <section className="kpi-grid reveal delay-3" aria-label="Ключевые показатели">
        <article className="soft-card kpi"><span>Лиды</span><strong><AnimatedNumber value={1671} /></strong><small>100% входящего потока</small></article>
        <article className="soft-card kpi"><span>Качественные</span><strong><AnimatedNumber value={865} /></strong><small className="positive">51,8% от лидов</small></article>
        <article className="soft-card kpi"><span>Успешные сделки</span><strong><AnimatedNumber value={230} /></strong><small>26,6% от сделок</small></article>
        <article className="soft-card kpi"><span>Средний чек</span><strong><AnimatedNumber value={146377} suffix=" ₽" /></strong><small>по успешным сделкам</small></article>
      </section>

      <section className="section">
        <div className="section-heading reveal">
          <div><p className="eyebrow">Динамика</p><h2>Пульс по неделям</h2></div>
          <p>Пик выручки — неделя 22 июня. Последние когорты ещё дозревают, поэтому их конверсия ниже.</p>
        </div>
        <div className="soft-card chart-card reveal">
          <div className="chart-legend"><span><i className="cyan" /> Выручка</span><span><i className="amber" /> Конверсия сделки</span></div>
          <div className="chart">
            {weeks.map((week, index) => (
              <div className="bar-column" key={week.date}>
                <div className="bar-value">{(week.revenue / 1_000_000).toFixed(1)}м</div>
                <div className="bar-track">
                  <div className="bar" style={{ height: `${Math.max(9, week.revenue / maxRevenue * 100)}%`, animationDelay: `${index * 45}ms` }} />
                  <span className="conversion-dot" style={{ bottom: `${week.conversion / 42 * 100}%` }} title={`${week.conversion}%`} />
                </div>
                <span>{week.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section split">
        <div>
          <div className="section-heading compact reveal">
            <div><p className="eyebrow">Сегменты</p><h2>B2C / B2B</h2></div>
          </div>
          <div className="soft-card segment-card reveal">
            <div className="segmented" role="group" aria-label="Выбор сегмента">
              {(["all", "b2c", "b2b"] as const).map((key) => (
                <button key={key} className={segment === key ? "active" : ""} onClick={() => setSegment(key)}>
                  {key === "all" ? "Все" : key.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="segment-value"><strong>{money(segmentData.revenue)} ₽</strong><span>выручка</span></div>
            <div className="segment-stats">
              <div><b>{segmentData.deals}</b><span>сделок</span></div>
              <div><b>{segmentData.wins}</b><span>успешных</span></div>
              <div><b>{segmentData.conversion}%</b><span>конверсия</span></div>
            </div>
          </div>
        </div>
        <div>
          <div className="section-heading compact reveal">
            <div><p className="eyebrow">Команда</p><h2>Фокус менеджеров</h2></div>
          </div>
          <div className="soft-card manager-list reveal">
            {managers.map((manager, index) => (
              <div className="manager" key={manager.name}>
                <span className="rank">0{index + 1}</span>
                <div className="manager-main"><b>{manager.name}</b><span>{manager.leads} лидов · {manager.wins} продаж</span></div>
                <div className="quality"><b>{manager.quality}%</b><span>качество</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section split bottom-grid">
        <div className="soft-card funnel reveal">
          <p className="eyebrow">Воронка</p>
          <h2>От интереса к оплате</h2>
          <div className="funnel-steps">
            <div style={{ width: "100%" }}><span>Лиды</span><b>1 671</b></div>
            <div style={{ width: "76%" }}><span>Качественные</span><b>865</b></div>
            <div style={{ width: "55%" }}><span>Сделки</span><b>865</b></div>
            <div style={{ width: "34%" }}><span>Успех</span><b>230</b></div>
          </div>
        </div>
        <div className="soft-card reasons reveal">
          <p className="eyebrow">Потери</p>
          <h2>Почему сделки не состоялись</h2>
          <div className="reason-list">
            {reasons.map((reason) => (
              <div className="reason" key={reason.label}>
                <div><span>{reason.label}</span><b>{reason.value}</b></div>
                <div className="reason-track"><i style={{ width: `${reason.value / reasons[0].value * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="insight reveal">
        <div><p className="eyebrow">Вывод</p><h2>Главный резерв — контакт.</h2></div>
        <p><b>126 сделок</b> потеряны после трёх безуспешных касаний. Улучшение дозвона и сценариев возврата даст больший эффект, чем наращивание входящего потока.</p>
      </section>

      <footer>
        <span>Парк Сказка · Отдел продаж</span>
        <span>Источник: CRM-выгрузка · обновлено 26.07.2026</span>
      </footer>
    </main>
  );
}
