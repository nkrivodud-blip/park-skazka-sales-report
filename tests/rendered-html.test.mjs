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
  assert.match(html, /14,59 млн ₽/);
  assert.match(html, /5,27 млн ₽/);
  assert.match(html, /41 сделка/);
  assert.match(html, /43 сделки/);
  assert.match(html, /18,8%/);
  assert.match(html, /17,9%/);
  assert.match(html, /Внесена предоплата/);
  assert.match(html, /Верю, но с рисками/);
  assert.match(html, /1 271/);
  assert.match(html, /Айва — 8 слотов в день, шатёр FOOD — 6/);
  assert.match(html, /91 занятая слот-единица/);
  assert.match(html, /43 из 410/);
  assert.match(html, /28 августа · весь Айва-парк/);
  assert.match(html, /Отдел продаж · факт/);
  assert.match(html, /выполнение 7,7%/i);
  assert.match(html, /выполнение 8,7%/i);
  assert.match(html, /выполнение 5,4%/i);
  assert.match(html, /Планы и выполнение по менеджерам/);
  assert.match(html, /Осталось добрать 62,76 млн ₽/);
  assert.match(html, /Осталось добрать 43,83 млн ₽/);
  assert.match(html, /Осталось добрать 18,93 млн ₽/);
  assert.match(html, /План не назначен/);
  assert.match(html, /В план B2B:/);
  assert.match(html, /Очищенные лиды по неделям/);
  assert.match(html, /Приток новых сделок по неделям/);
  assert.match(html, /Динамика оплаченного контура по неделям/);
  assert.match(html, /Пиковые даты по загрузке площадок/);
  assert.equal((html.match(/<article\b/g) ?? []).length, (html.match(/<article\b[^>]*data-hint=/g) ?? []).length);
  assert.doesNotMatch(html, /codex-preview|Building your site|Your site is taking shape/i);
});
