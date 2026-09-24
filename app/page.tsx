"use client";
import type { CSSProperties } from "react";
import PipelineDashboard from "./PipelineDashboard";
import ManagerDashboard from "./ManagerDashboard";
import CapacityDashboard from "./CapacityDashboard";

const qlWeekly = [
  ["24–30.08", 111, 7, 0, false],
  ["31.08–06.09", 82, 11, 27, false],
  ["07–13.09", 110, 15, 0, false],
  ["14–20.09", 87, 11, 0, false],
  ["21–23.09", 20, 4, 0, true],
] as const;

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand-mark">ПС</span>
          <span>Продажи · сезон 2026</span>
        </a>
        <nav>
          <a href="#pipeline">Pipeline</a>
          <a href="#leads">Лиды</a>
          <a href="#managers">Менеджеры</a>
          <a href="#capacity">Площадки</a>
        </nav>
      </header>
      <section className="hero reveal" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Отдел продаж · обновлено 24 сентября 2026</p>
          <h1>Продажи, pipeline и загрузка площадок.</h1>
          <p className="lead">
            Отчёт обновлён по новым B2C- и B2B-выгрузкам. В каждом ключевом
            блоке доступны пять периодов.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#pipeline">
              Смотреть pipeline
            </a>
            <a className="button ghost" href="#leads">
              Смотреть лиды
            </a>
          </div>
        </div>
        <div className="hero-score">
          <span>План сентября</span>
          <strong>38,03 млн ₽</strong>
          <div className="score-track">
            <i style={{ width: "20.2%" }} />
          </div>
          <small>Факт 7,68 млн ₽ · 20,2% плана</small>
        </div>
      </section>
      <PipelineDashboard />
      <section className="section" id="leads">
        <div className="section-heading reveal">
          <p className="eyebrow">Лиды · 21–23 сентября</p>
          <h2>QL лиды по направлениям</h2>
          <p>
            Основной показатель — квалифицированные лиды. NQL показываем
            справочно для расчёта конверсии.
          </p>
        </div>
        <div className="capacity-summary reveal">
          <article className="accent">
            <span>QL лиды</span>
            <strong>24</strong>
            <small>21–23.09 · 100% от NQL</small>
          </article>
          <article>
            <span>QL · B2C</span>
            <strong>20</strong>
            <small>83,3% квалифицированных лидов</small>
          </article>
          <article>
            <span>QL · B2B</span>
            <strong>4</strong>
            <small>16,7% квалифицированных лидов</small>
          </article>
          <article className="reference">
            <span>NQL · справочно</span>
            <strong>24</strong>
            <small>8,0 лидов в день</small>
          </article>
        </div>
        <div className="chart-heading reveal">
          <h3>QL лиды по неделям: B2C и B2B</h3>
          <p>
            Парные столбцы показывают распределение квалифицированных лидов по
            направлениям. Звёздочкой отмечена неполная неделя.
          </p>
        </div>
        <div
          className="ql-chart reveal"
          aria-label="QL лиды B2C и B2B по неделям"
        >
          {qlWeekly.map(([label, b2c, b2b, other, partial]) => (
            <div className="ql-week" key={label}>
              <div className="ql-bars">
                <div
                  className="ql-series b2c"
                  style={
                    { "--height": `${(b2c / 120) * 100}%` } as CSSProperties
                  }
                >
                  <b>{b2c}</b>
                  <span>B2C</span>
                </div>
                <div
                  className="ql-series b2b"
                  style={
                    { "--height": `${(b2b / 120) * 100}%` } as CSSProperties
                  }
                >
                  <b>{b2b}</b>
                  <span>B2B</span>
                </div>
              </div>
              <strong>
                {label}
                {partial ? "*" : ""}
              </strong>
              <small>
                {b2c + b2b + other} QL всего
                {other ? ` · ${other} без направления` : ""}
              </small>
            </div>
          ))}
        </div>
        <div className="ql-legend reveal">
          <span>
            <i className="legend-dot b2c" />
            B2C
          </span>
          <span>
            <i className="legend-dot b2b" />
            B2B
          </span>
          <span>NQL: 121 · 120 · 135 · 104 · 24 (справочно)</span>
        </div>
      </section>
      <ManagerDashboard />
      <CapacityDashboard />
      <footer>
        <div>
          <strong>Парк «Сказка» · отчёт продаж</strong>
          <span>Bitrix · 24.09.2026 · сметы · 17.09.2026</span>
        </div>
        <span>Публичная версия без исходных выгрузок</span>
      </footer>
    </main>
  );
}
