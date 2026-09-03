import fs from "node:fs/promises";

const workerUrl = new URL("./dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render returned ${response.status}`);

const source = await response.text();
let main = source.match(/<main[\s\S]*?<\/main>/)?.[0];
if (!main) throw new Error("Rendered report content was not found");

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const setCounter = (label, value) => {
  const pattern = new RegExp(`(<span>${escapeRegExp(label)}<\\/span><strong>)[\\s\\S]*?(<\\/strong>)`);
  if (!pattern.test(main)) throw new Error(`Counter label not found: ${label}`);
  main = main.replace(pattern, `$1${value}$2`);
};


const rawCss = await fs.readFile("app/globals.css", "utf8");
const css = rawCss.replace(/url\((['"]?)\//g, "url($1./");

const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f5f7f8">
  <title>Продажи · Август 2026 · Парк Сказка</title>
  <meta name="description" content="Управленческий отчёт по лидам, сделкам B2C и B2B, планам менеджеров и загрузке площадок за август 2026 года.">
  <meta property="og:title" content="Продажи Парка Сказка · Август 2026">
  <meta property="og:description" content="Pipeline, оплаченный контур, выполнение планов и загрузка площадок.">
  <link rel="icon" href="./favicon.svg">
  <style>${css}</style>
</head>
<body>
${main}
<script>
  (() => {
    document.querySelectorAll('[data-dashboard]').forEach((root) => {
      const select = root.querySelector('[data-period-select]');
      if (!select) return;
      const update = () => {
        root.querySelectorAll('[data-period-panel]').forEach((node) => { node.hidden = node.dataset.periodPanel !== select.value; });
        root.querySelectorAll('[data-period-range]').forEach((node) => { node.hidden = node.dataset.periodRange !== select.value; });
      };
      select.addEventListener('change', update); update();
    });
  })();
</script>
</body>
</html>`;

await fs.mkdir(".pages", { recursive: true });
await fs.writeFile(".pages/index.html", html, "utf8");
await fs.writeFile(".pages/.nojekyll", "", "utf8");
await fs.copyFile("public/favicon.svg", ".pages/favicon.svg");

try {
  await fs.copyFile("public/og.png", ".pages/og.png");
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
