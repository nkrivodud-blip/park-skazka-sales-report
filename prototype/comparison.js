const periodAxisLabels = {
  august: Array.from({length: 31}, (_, index) => `${index + 1} авг`),
  september: Array.from({length: 30}, (_, index) => `${index + 1} сен`),
  season: ['01–05 апр','06–12 апр','13–19 апр','20–26 апр','27 апр–03 мая','04–10 мая','11–17 мая','18–24 мая','25–31 мая','01–07 июн','08–14 июн','15–21 июн','22–28 июн','29 июн–05 июл','06–12 июл','13–19 июл','20–26 июл','27 июл–02 авг','03–09 авг','10–16 авг','17–23 авг','24–30 авг','31 авг–06 сен','07–13 сен','14–20 сен','21–27 сен','28–30 сен'],
  winter: ['01–04 окт','05–11 окт','12–18 окт','19–25 окт','26 окт–01 ноя','02–08 ноя','09–15 ноя','16–22 ноя','23–29 ноя','30 ноя–06 дек','07–13 дек','14–20 дек','21–27 дек','28 дек–03 янв','04–10 янв','11–17 янв','18–24 янв','25–31 янв','01–07 фев','08–14 фев','15–21 фев','22–28 фев','01–07 мар','08–14 мар','15–21 мар','22–28 мар','29–31 мар']
};

document.querySelectorAll('.metric').forEach((card, metricIndex) => {
  const chart = card.querySelector('.chart');
  chart.querySelectorAll(':scope > .bar').forEach((bar, index) => {
    const height = Number.parseFloat(bar.style.getPropertyValue('--h')) || 10;
    const date = bar.querySelector('small')?.textContent || String(index + 1);
    const weekend = bar.classList.contains('weekend');
    const rawValue = bar.dataset.value || '';
    const amount = Number.parseInt(rawValue.replace(/[^\d]/g, ''), 10) || 0;
    const group = document.createElement('div');
    group.className = `bar-group${weekend ? ' weekend' : ''}`;
    group.innerHTML = `
      <div class="bar current" style="--h:${height}%" data-value="2026 · ${rawValue}"></div>
      <div class="bar y25" style="--h:${Math.max(8, height * .84 + 8)}%" data-value="2025 · ${Math.round(amount * .93).toLocaleString('ru-RU')} тыс. ₽"></div>
      <div class="bar y24" style="--h:${Math.max(8, height * .72 + 12)}%" data-value="2024 · ${Math.round(amount * .82).toLocaleString('ru-RU')} тыс. ₽"></div>
      <small>${date}</small>`;
    bar.replaceWith(group);
  });

  const summary = document.createElement('div');
  summary.className = 'comparison-summary';
  const delta25 = [7.5, -4.2, 12.8, 9.4][metricIndex];
  const delta24 = [18, 6.7, -3.1, 14.6][metricIndex];
  summary.innerHTML = `
    <span class="summary25">2026 ${delta25 >= 0 ? 'выше' : 'ниже'} 2025 на ${Math.abs(delta25).toLocaleString('ru-RU')}%</span>
    <span class="summary24">2026 ${delta24 >= 0 ? 'выше' : 'ниже'} 2024 на ${Math.abs(delta24).toLocaleString('ru-RU')}%</span>`;
  card.querySelector('.legend').after(summary);

  card.querySelector('.compare24').addEventListener('change', event => {
    card.classList.toggle('show24', event.target.checked);
  });
  card.querySelector('.compare25').addEventListener('change', event => {
    card.classList.toggle('show25', event.target.checked);
  });
  const periodSelect = card.querySelector('.metric-period');
  const applyPeriod = value => {
    const labels = periodAxisLabels[value];
    const weekly = value === 'season' || value === 'winter';
    card.querySelector('.metric-title span').textContent = weekly ? 'Динамика по неделям · месяц указан на оси' : 'Динамика по дням';
    chart.style.gridTemplateColumns = `repeat(${labels.length}, minmax(26px, 1fr))`;
    card.querySelectorAll('.bar-group').forEach((group, index) => {
      group.hidden = index >= labels.length;
      if (labels[index]) group.querySelector('small').textContent = labels[index];
    });
  };
  periodSelect.addEventListener('change', event => applyPeriod(event.target.value));
  applyPeriod(periodSelect.value);
});
