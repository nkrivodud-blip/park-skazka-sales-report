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
  assert.match(html, /Денежный приток в pipeline по неделям/);
  assert.match(html, /Приток оплаченных сделок/);
  assert.match(html, /69,84 млн ₽/);
  assert.match(html, /15,92 млн ₽/);
  assert.match(html, /91,8%/);
  assert.match(html, /Договор и предоплата/);
  assert.match(html, /среднее \+11,75 млн ₽\/нед\./);
  assert.match(html, /Последняя полная неделя/);
  assert.match(html, /−29,5% к предыдущей/);
  assert.match(html, /Это валовый приток новых сделок/);
  assert.match(html, /1 271/);
  assert.match(html, /Айва — 8 слотов в день, шатёр FOOD — 6/);
  assert.match(html, /39 из 410/);
  assert.match(html, /Эффективность менеджеров|Команда продаж/);
  assert.match(html, /11,43 млн ₽/);
  assert.match(html, /выполнение плана 16,8%/i);
  assert.match(html, /выполнение плана 14,1%/i);
  assert.match(html, /выполнение плана 23,2%/i);
  assert.match(html, /Планы и выполнение по менеджерам/);
  assert.match(html, /Осталось добрать 56,59 млн ₽/);
  assert.match(html, /Осталось добрать 41,24 млн ₽/);
  assert.match(html, /Осталось добрать 15,35 млн ₽/);
  assert.match(html, /План не назначен/);
  assert.match(html, /В план B2B:/);
  assert.match(html, /Очищенные лиды по неделям/);
  assert.match(html, /Приток новых сделок по неделям/);
  assert.match(html, /Динамика оплаченного контура по неделям/);
  assert.match(html, /Пиковые даты по загрузке площадок/);
  assert.equal((html.match(/<article\b/g) ?? []).length, (html.match(/<article\b[^>]*data-hint=/g) ?? []).length);
  assert.doesNotMatch(html, /codex-preview|Building your site|Your site is taking shape/i);
});
