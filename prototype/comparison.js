const DATA = window.ACTUAL_REPORT_DATA;
const metricKeys = ['fact', 'prepaid', 'weighted', 'raw'];
const money = value => value ? `${(value / 1e6).toLocaleString('ru-RU', {maximumFractionDigits: 2})} млн ₽` : '0 ₽';
const directionKey = value => value === 'B2C' || value === 'B2B' ? value : 'all';
const periodKey = value => value === 'aug' ? 'august' : value === 'sep' ? 'september' : value;

function renderHero() {
  const period = periodKey(document.querySelector('#heroPeriod').value);
  const direction = directionKey(document.querySelector('#heroDirection').value.toUpperCase());
  const fact = DATA.periods[period].metrics.fact[direction].sum;
  const plan = DATA.periods[period].plan[direction];
  const percent = plan ? fact / plan * 100 : 0;
  document.querySelector('#heroFact').textContent = `${money(fact)} / ${money(plan)}`;
  document.querySelector('#heroPct').textContent = `${percent.toLocaleString('ru-RU', {maximumFractionDigits: 1})}%`;
  document.querySelector('#heroDonut').style.setProperty('--p', Math.min(percent, 100));
  document.querySelector('#heroCaption').textContent = `${document.querySelector('#heroPeriod').selectedOptions[0].text} · ${direction === 'all' ? 'общие цифры' : direction}`;
}

document.querySelectorAll('.metric').forEach((card, metricIndex) => {
  const metric = metricKeys[metricIndex];
  const periodSelect = card.querySelector('.metric-period');
  const directionSelect = card.querySelector('.inline-controls select:nth-child(2)');
  const chart = card.querySelector('.chart');
  const footer = card.querySelector('.total');
  const legend = card.querySelector('.legend');
  const summary = document.createElement('div');
  summary.className = 'comparison-summary';
  legend.after(summary);

  function renderComparison() {
    const period = periodSelect.value;
    const direction = directionKey(directionSelect.value);
    const current = DATA.periods[period].metrics[metric][direction].sum;
    summary.innerHTML = '';
    [['2025', card.querySelector('.compare25').checked], ['2024', card.querySelector('.compare24').checked]].forEach(([year, checked]) => {
      if (!checked) return;
      if (metric !== 'fact' || direction !== 'all') {
        summary.insertAdjacentHTML('beforeend', `<span style="display:block;background:#f1f4f6;color:#66798b">Нет сопоставимой детализации ${year} для выбранного показателя</span>`);
        return;
      }
      const previous = DATA.periods[period].comparison[year];
      const delta = previous ? (current - previous) / previous * 100 : 0;
      summary.insertAdjacentHTML('beforeend', `<span style="display:block;background:${delta >= 0 ? '#e4f5f0' : '#faece9'};color:${delta >= 0 ? '#08786f' : '#a4483e'}">${year}: ${money(previous)} · 2026 ${delta >= 0 ? 'выше' : 'ниже'} на ${Math.abs(delta).toLocaleString('ru-RU', {maximumFractionDigits: 1})}%</span>`);
    });
  }

  function render() {
    const period = periodSelect.value;
    const direction = directionKey(directionSelect.value);
    const current = DATA.periods[period].metrics[metric][direction];
    const max = Math.max(1, ...current.series.map(item => item.sum));
    chart.style.gridTemplateColumns = `repeat(${Math.max(1, current.series.length)}, minmax(52px, 1fr))`;
    chart.innerHTML = current.series.length ? current.series.map(item => `<div class="bar-group${item.weekend ? ' weekend' : ''}"><div class="bar current" style="--h:${Math.max(5, item.sum / max * 100)}%" data-value="${item.label} · ${money(item.sum)} · ${item.count} шт."></div><small>${item.label}</small></div>`).join('') : '<p style="align-self:center;color:var(--muted)">Нет данных за выбранный период</p>';
    const plan = DATA.periods[period].plan[direction];
    const percent = metric === 'fact' && plan ? current.sum / plan * 100 : 0;
    footer.innerHTML = `<div><span>Total за период</span><b>${money(current.sum)}</b></div><div><span>Количество</span><b>${current.count} сделок</b></div><div><span>План</span><b>${plan ? money(plan) : 'Не задан'}</b></div><div><span>Выполнение</span><b>${metric === 'fact' && plan ? `${percent.toLocaleString('ru-RU', {maximumFractionDigits: 1})}%` : '—'}</b><div class="progress"><i style="--p:${Math.min(percent, 100)}%"></i></div></div>`;
    card.querySelector('.metric-title span').textContent = period === 'august' || period === 'september' ? 'Фактические данные по дням мероприятия' : 'Фактические данные по неделям мероприятия';
    renderComparison();
  }

  periodSelect.addEventListener('change', render);
  directionSelect.addEventListener('change', render);
  card.querySelector('.compare24').addEventListener('change', renderComparison);
  card.querySelector('.compare25').addEventListener('change', renderComparison);
  render();
});

const leadWeeks = DATA.leads.weeks;
const leadNql = leadWeeks.reduce((sum, item) => sum + item.nql, 0);
const leadQl = leadWeeks.reduce((sum, item) => sum + item.ql, 0);
const leadRate = leadNql ? leadQl / leadNql * 100 : 0;
const leadCard = document.querySelector('.lead-score');
leadCard.querySelector('.donut').style.background = `conic-gradient(var(--teal) ${leadRate}%,#e4ebef 0)`;
leadCard.querySelector('.donut b').textContent = `${leadRate.toLocaleString('ru-RU', {maximumFractionDigits: 1})}%`;
leadCard.querySelector('span').textContent = 'Конверсия NQL → QL';
leadCard.querySelector('h3').textContent = `${leadQl} из ${leadNql}`;
leadCard.querySelector('p').textContent = 'Данные трёх последних периодов';
document.querySelector('.mini-bars').innerHTML = leadWeeks.map(item => `<div class="mini-row"><span>${item.label}${item.partial ? '*' : ''}</span><div class="track"><i style="--w:${item.ql / Math.max(...leadWeeks.map(row => row.ql)) * 100}%"></i></div><b>${item.ql} QL</b></div>`).join('') + `<p style="color:var(--muted);margin:14px 0 0">${leadWeeks.map(item => `${item.label}: B2C ${item.B2C} · B2B ${item.B2B}${item.other ? ` · без направления ${item.other}` : ''}`).join('<br>')}</p>`;

const managerPeriod = document.querySelector('.manager-picker select:nth-child(2)');
const managerDirection = document.querySelector('.manager-picker select:nth-child(3)');
const managerName = document.querySelector('.manager-picker select:nth-child(1)');
function managerOptions() {
  const records = Object.values(DATA.periods[managerPeriod.value].managers).filter(item => item.direction === managerDirection.value);
  managerName.innerHTML = records.map(item => `<option>${item.name}</option>`).join('');
}
function renderManager() {
  const period = managerPeriod.value;
  const direction = managerDirection.value;
  const record = DATA.periods[period].managers[`${managerName.value}|${direction}`];
  if (!record) {
    document.querySelector('#managerCharts').innerHTML = '<article class="manager-metric"><h3>Нет данных за выбранный период</h3></article>';
    return;
  }
  const fact = record.metrics.fact;
  const conversion = record.total ? (fact.count + record.metrics.prepaid.count) / record.total * 100 : 0;
  const average = fact.count ? fact.sum / fact.count : 0;
  const definitions = [
    ['Конверсия', `${conversion.toLocaleString('ru-RU', {maximumFractionDigits: 1})}%`, fact.series],
    ['Факт выручки', money(fact.sum), fact.series],
    ['Средний чек', money(average), fact.series],
    ['Предоплаты', money(record.metrics.prepaid.sum), record.metrics.prepaid.series],
    ['Взвешенный pipeline', money(record.metrics.weighted.sum), record.metrics.weighted.series],
    ['Сырой pipeline', money(record.metrics.raw.sum), record.metrics.raw.series],
    ['Выполнение плана', record.plan ? `${(fact.sum / record.plan * 100).toLocaleString('ru-RU', {maximumFractionDigits: 1})}%` : 'План не задан', fact.series],
    ['Недобор', record.plan ? money(Math.max(0, record.plan - fact.sum)) : 'План не задан', fact.series]
  ];
  document.querySelector('#managerCharts').innerHTML = definitions.map(([title, total, source]) => {
    const maximum = Math.max(1, ...source.map(item => item.sum));
    return `<article class="manager-metric"><h3>${title}</h3><div class="spark">${source.map(item => `<i title="${item.label}: ${money(item.sum)}" style="--h:${item.sum ? Math.max(5, item.sum / maximum * 100) : 0}%"></i>`).join('')}</div><div class="manager-foot"><span>${source.reduce((sum, item) => sum + item.count, 0)} сделок</span><b>${total}</b></div></article>`;
  }).join('');
}
managerPeriod.addEventListener('change', () => { managerOptions(); renderManager(); });
managerDirection.addEventListener('change', () => { managerOptions(); renderManager(); });
managerName.addEventListener('change', renderManager);
managerOptions(); renderManager();

const capacitySelect = document.querySelector('#capacity .inline-controls select');
function renderCapacity() {
  const capacity = DATA.capacity[capacitySelect.value];
  const cards = [document.querySelector('#utilA'), document.querySelector('#utilB')];
  cards[0].innerHTML = '<h3>Локации 1–4</h3>';
  cards[1].innerHTML = '<h3>Локации 5–7</h3>';
  capacity.locations.forEach((location, index) => {
    const percent = location.capacity ? location.occupied / location.capacity * 100 : 0;
    cards[index < 4 ? 0 : 1].insertAdjacentHTML('beforeend', `<div class="util-row"><header><span>${location.name}</span><b>${percent.toLocaleString('ru-RU', {maximumFractionDigits: 1})}%</b></header><div class="stack"><i class="success" style="--s:${percent}%"></i></div><small>${location.occupied} из ${location.capacity} слот-единиц</small></div>`);
  });
  document.querySelector('#capacity .legend').innerHTML = `<span><i class="dot"></i>Занятые слот-единицы</span><span>Всего: ${capacity.occupied} из ${capacity.capacity} · ${capacity.events} мероприятий</span>`;
}
capacitySelect.addEventListener('change', renderCapacity); renderCapacity();

document.querySelector('#heroPeriod').addEventListener('change', renderHero);
document.querySelector('#heroDirection').addEventListener('change', renderHero);
renderHero();
