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
  assert.match(html, /Pipeline на август/);
  assert.match(html, /9,55 млн ₽/);
  assert.match(html, /Предоплачено · август/);
  assert.match(html, /30,35 млн ₽/);
  assert.match(html, /15,26 млн ₽/);
  assert.match(html, /1,78 млн ₽/);
  assert.match(html, /8,95 млн ₽/);
  assert.match(html, /72 сделки/);
  assert.match(html, /39 сделок/);
  assert.match(html, /23,5%/);
  assert.match(html, /Предоплаченные сделки/);
  assert.match(html, /Верю, но с рисками/);
  assert.match(html, /1 271/);
  assert.match(html, /Айва — 8 слотов в день, шатёр FOOD — 6/);
  assert.match(html, /141 занятая слот-единица/);
  assert.match(html, /74 из 410/);
  assert.match(html, /28 августа · весь Айва-парк/);
  assert.match(html, /Отдел продаж · факт/);
  assert.match(html, /Показатели по менеджерам · B2B и B2C отдельно/);
  assert.match(html, /Успех <!-- -->21,6<!-- -->%/);
  assert.match(html, /Предоплата <!-- -->7,8<!-- -->%/);
  assert.match(html, /140 уникальным сметам/);
  assert.match(html, /Очищенные лиды по неделям/);
  assert.match(html, /10–16.08/);
  assert.doesNotMatch(html, /Топ-5 источников/);
  assert.match(html, /Приток новых сделок по неделям/);
  assert.match(html, /Динамика оплаченного контура по неделям/);
  assert.match(html, /Пиковые даты по загрузке площадок/);
  assert.doesNotMatch(html, /Пакеты и допродажи|Пакетные семейства|Что чаще всего допродают/);
  assert.equal((html.match(/<article\b/g) ?? []).length, (html.match(/<article\b[^>]*data-hint=/g) ?? []).length);
  assert.doesNotMatch(html, /codex-preview|Building your site|Your site is taking shape/i);
});
