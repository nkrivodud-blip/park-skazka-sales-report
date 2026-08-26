import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the August sales report", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Продажи · Август 2026 · Парк Сказка<\/title>/i);
  assert.match(html, /Pipeline · данные на 26 августа/);
  assert.match(html, /Текущий месяц/);
  assert.match(html, /2026 год/);
  assert.match(html, /13,21 млн ₽/);
  assert.match(html, /102 сделки/);
  assert.match(html, /Предоплачено/);
  assert.match(html, /9,62 млн ₽/);
  assert.match(html, /Взвешенный pipeline/);
  assert.match(html, /0,59 млн ₽/);
  assert.match(html, /Сырой pipeline/);
  assert.match(html, /1,32 млн ₽/);
  assert.match(html, /Динамика недельных снимков · мероприятия 2026 года/);
  assert.match(html, /История фактического состояния в даты отчётов/);
  assert.match(html, /Предоплаченные сделки/);
  assert.match(html, /20.08/);
  assert.match(html, /26.08/);
  assert.match(html, /сравнивают сохранённые годовые снимки отчёта/);
  assert.match(html, /81,44 млн ₽/);
  assert.match(html, /18,69 млн ₽/);
  assert.match(html, /34,92 млн ₽/);
  assert.match(html, /Предоплаченные сделки/);
  assert.match(html, /Верю, но с рисками/);
  assert.match(html, /1 271/);
  assert.match(html, /Айва — 8 слотов в день, шатёр FOOD — 6/);
  assert.match(html, /141 занятая слот-единица/);
  assert.match(html, /74 из 410/);
  assert.match(html, /28 августа · весь Айва-парк/);
  assert.match(html, /Отдел продаж · факт/);
  assert.match(html, /Показатели по менеджерам · B2B и B2C отдельно/);
  assert.match(html, /36,2<!-- -->%/);
  assert.match(html, /Методика конверсии/);
  assert.match(html, /Сырой pipeline/);
  assert.doesNotMatch(html, /Александр Поленко/);
  assert.match(html, /140 уникальным сметам/);
  assert.match(html, /Очищенные лиды по неделям/);
  assert.match(html, /10–16.08/);
  assert.doesNotMatch(html, /Топ-5 источников/);
  assert.match(html, /Пиковые даты по загрузке площадок/);
  assert.doesNotMatch(html, /Пакеты и допродажи|Пакетные семейства|Что чаще всего допродают/);
  assert.equal((html.match(/<article\b/g) ?? []).length, (html.match(/<article\b[^>]*data-hint=/g) ?? []).length);
  assert.doesNotMatch(html, /codex-preview|Building your site|Your site is taking shape/i);
});
