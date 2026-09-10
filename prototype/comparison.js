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
  card.querySelector('.metric-period').addEventListener('change', event => {
    card.querySelectorAll('.bar-group small').forEach((label, index) => {
      label.textContent = event.target.value === 'month' ? String(index + 1) : `Нед. ${index + 1}`;
    });
  });
});
