import fs from "node:fs/promises";

const response = await fetch("http://localhost:3000/");
if (!response.ok) throw new Error(`Preview returned ${response.status}`);

const source = await response.text();
const main = source.match(/<main[\s\S]*?<\/main>/)?.[0];
if (!main) throw new Error("Rendered page content was not found");

const rawCss = await fs.readFile("app/globals.css", "utf8");
const css = rawCss
  .replace('@import "tailwindcss";', "")
  .replace(/url\("\//g, 'url("./');

const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#11181c">
  <title>Парк Сказка — отчёт по продажам</title>
  <meta name="description" content="Интерактивный отчёт по лидам и сделкам B2B/B2C за апрель–июль 2026 года.">
  <meta property="og:title" content="Парк Сказка — отчёт по продажам">
  <meta property="og:description" content="33,67 млн ₽ выручки: аналитика лидов и сделок B2B/B2C.">
  <meta property="og:image" content="./og.png">
  <style>${css}</style>
</head>
<body>
${main}
<script>
const data = {
  all: { deals: 865, wins: 230, revenue: "33 666 864 ₽", conversion: "26.6%" },
  b2c: { deals: 794, wins: 223, revenue: "27 084 491 ₽", conversion: "28.1%" },
  b2b: { deals: 71, wins: 7, revenue: "6 582 373 ₽", conversion: "9.9%" }
};
document.querySelectorAll(".segmented button").forEach((button, index) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const key = ["all", "b2c", "b2b"][index];
    const value = data[key];
    document.querySelector(".segment-value strong").textContent = value.revenue;
    const stats = document.querySelectorAll(".segment-stats b");
    stats[0].textContent = value.deals;
    stats[1].textContent = value.wins;
    stats[2].textContent = value.conversion;
  });
});
</script>
</body>
</html>`;

await fs.mkdir(".pages", { recursive: true });
await fs.writeFile(".pages/index.html", html, "utf8");
await fs.copyFile("public/og.png", ".pages/og.png");
await fs.writeFile(".pages/.nojekyll", "", "utf8");
