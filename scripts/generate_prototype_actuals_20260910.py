import json
from io import StringIO
from pathlib import Path

import pandas as pd

FILES = {
    "B2C": Path(r"C:/Users/n.krivodud/Downloads/DEAL_20260910_d766d98b_6aa263653d17c.xls"),
    "B2B": Path(r"C:/Users/n.krivodud/Downloads/DEAL_20260910_d766d98b_6aa2633b4648b.xls"),
}
HISTORY_FILES = {
    "B2B": Path(r"C:/Users/n.krivodud/Downloads/DEAL_20260910_d766d98b_6aa2987aaef5f.xls"),
    "B2C": Path(r"C:/Users/n.krivodud/Downloads/DEAL_20260910_d766d98b_6aa29858d69bc.xls"),
}
WEIGHTS = {"Верю, что закроется": .9, "Верю, но с рисками": .5, "Не верю": .2}
STAGES = {
    "B2C": {"prepaid": {"Внесена предоплата", "4 дня до банкета", "1 день до банкета", "Банкет начался"}, "active": {"В работе", "Сделано предложение"}},
    "B2B": {"prepaid": {"Договор и предоплата", "Подготовка к мероприятию", "Дополнительный счет", "Дополнительный счёт"}, "active": {"В работе", "Направлено КП"}},
}
PERIODS = {
    "august": (pd.Timestamp("2026-08-01"), pd.Timestamp("2026-08-31"), "day"),
    "september": (pd.Timestamp("2026-09-01"), pd.Timestamp("2026-09-30"), "day"),
    "season": (pd.Timestamp("2026-04-01"), pd.Timestamp("2026-09-30"), "week"),
    "winter": (pd.Timestamp("2026-10-01"), pd.Timestamp("2027-03-31"), "week"),
}
PLANS = {
    "august": {"all": 68026312, "B2C": 48026312, "B2B": 20000000},
    "september": {"all": 38026312, "B2C": 28026312, "B2B": 10000000},
    "season": {"all": 220000000, "B2C": 167060170, "B2B": 52939830},
    "winter": {"all": 0, "B2C": 0, "B2B": 0},
}
COMPARISON = {
    "august": {"2025": 9200000, "2024": 19000000},
    "september": {"2025": 9500000, "2024": 18000000},
    "season": {"2025": 66100000, "2024": 93400000},
    "winter": {"2025": 26400000, "2024": 46300000},
}
ALLOWED = {
    "B2C": {"Александр Воронин", "Варвара Чугреева", "Лилия Рамазанова", "Людмила Запорожец"},
    "B2B": {"Кристина Могачева", "Яна Кузнецова"},
}


def load(path):
    frame = pd.read_html(StringIO(path.read_text(encoding="utf-8-sig")), flavor="lxml")[0]
    frame["Сумма"] = pd.to_numeric(frame["Сумма"], errors="coerce").fillna(0)
    date_cols = [column for column in frame if str(column).startswith("Дата мероприятия")]
    frame["_date"] = pd.concat([pd.to_datetime(frame[column], dayfirst=True, errors="coerce") for column in date_cols], axis=1).bfill(axis=1).iloc[:, 0]
    title = frame.get("Название сделки", pd.Series("", index=frame.index)).astype(str)
    return frame[~(title.str.contains("Закрытие парка", case=False, na=False) & frame["Сумма"].ge(49_000_000))]


def select_metric(frame, direction, metric):
    if metric == "fact":
        result = frame[frame["Стадия сделки"].eq("Сделка успешна")].copy()
        result["_value"] = result["Сумма"]
    elif metric == "prepaid":
        result = frame[frame["Стадия сделки"].isin(STAGES[direction]["prepaid"])].copy()
        result["_value"] = result["Сумма"]
    else:
        result = frame[frame["Стадия сделки"].isin(STAGES[direction]["active"]) & frame["Прогноз закрытия"].isin(WEIGHTS)].copy()
        result["_value"] = result["Сумма"] if metric == "raw" else result["Сумма"] * result["Прогноз закрытия"].map(WEIGHTS)
    return result


def series(frame, start, end, grain):
    if grain == "day":
        dates = pd.date_range(start, end, freq="D")
        sums = frame.groupby(frame["_date"].dt.normalize())["_value"].sum()
        counts = frame.groupby(frame["_date"].dt.normalize()).size()
        return [{"key": date.strftime("%m-%d"), "label": date.strftime("%d.%m"), "sum": round(float(sums.get(date, 0))), "count": int(counts.get(date, 0)), "weekend": date.weekday() >= 5} for date in dates if sums.get(date, 0) or counts.get(date, 0)]
    first = start - pd.Timedelta(days=start.weekday())
    starts = pd.date_range(first, end, freq="7D")
    bucket = frame["_date"].dt.normalize() - pd.to_timedelta(frame["_date"].dt.weekday, unit="D")
    sums = frame.groupby(bucket)["_value"].sum()
    counts = frame.groupby(bucket).size()
    result = []
    for index, date in enumerate(starts):
        finish = min(date + pd.Timedelta(days=6), end)
        visible_start = max(date, start)
        if sums.get(date, 0) or counts.get(date, 0):
            result.append({"key": f"w{index:02d}", "label": f"{visible_start:%d.%m}–{finish:%d.%m}", "sum": round(float(sums.get(date, 0))), "count": int(counts.get(date, 0)), "weekend": False})
    return result


frames = {direction: load(path) for direction, path in FILES.items()}
history_frames = {direction: load(path) for direction, path in HISTORY_FILES.items()}
output = {"periods": {}, "leads": {"weeks": [
    {"label": "24–30.08", "nql": 121, "ql": 118, "B2C": 111, "B2B": 7, "other": 0},
    {"label": "31.08–06.09", "nql": 120, "ql": 120, "B2C": 82, "B2B": 11, "other": 27},
    {"label": "07–09.09", "nql": 57, "ql": 56, "B2C": 48, "B2B": 8, "other": 0, "partial": True},
]}}

for period, (start, end, grain) in PERIODS.items():
    period_data = {"plan": PLANS[period], "comparison": COMPARISON[period], "metrics": {}, "managers": {}, "history": {}}
    for metric in ("fact", "prepaid", "weighted", "raw"):
        period_data["metrics"][metric] = {}
        selected_by_direction = {}
        for direction, frame in frames.items():
            selected = select_metric(frame[frame["_date"].between(start, end)].copy(), direction, metric)
            selected_by_direction[direction] = selected
            period_data["metrics"][metric][direction] = {"sum": round(float(selected["_value"].sum())), "count": int(len(selected)), "series": series(selected, start, end, grain)}
        combined = pd.concat(selected_by_direction.values(), ignore_index=True)
        period_data["metrics"][metric]["all"] = {"sum": round(float(combined["_value"].sum())), "count": int(len(combined)), "series": series(combined, start, end, grain)}
    for direction, frame in frames.items():
        scoped = frame[frame["_date"].between(start, end) & frame["Ответственный"].isin(ALLOWED[direction])].copy()
        for manager, group in scoped.groupby("Ответственный"):
            key = f"{manager}|{direction}"
            record = {"name": manager, "direction": direction, "total": int(len(group)), "metrics": {}}
            for metric in ("fact", "prepaid", "weighted", "raw"):
                selected = select_metric(group, direction, metric)
                record["metrics"][metric] = {"sum": round(float(selected["_value"].sum())), "count": int(len(selected)), "series": series(selected, start, end, grain)}
            period_data["managers"][key] = record
    for year in (2024, 2025):
        if period == "winter":
            historical_start = pd.Timestamp(year=year, month=10, day=1)
            historical_end = pd.Timestamp(year=year + 1, month=3, day=31)
        else:
            historical_start = start.replace(year=year)
            historical_end = end.replace(year=year)
        directions = {}
        for direction, frame in history_frames.items():
            selected = frame[frame["_date"].between(historical_start, historical_end)].copy()
            selected["_value"] = selected["Сумма"]
            directions[direction] = selected
            period_data["history"].setdefault(str(year), {})[direction] = {
                "sum": round(float(selected["_value"].sum())), "count": int(len(selected)),
                "series": series(selected, historical_start, historical_end, grain),
            }
        combined = pd.concat(directions.values(), ignore_index=True)
        period_data["history"][str(year)]["all"] = {
            "sum": round(float(combined["_value"].sum())), "count": int(len(combined)),
            "series": series(combined, historical_start, historical_end, grain),
        }
    output["periods"][period] = period_data

report_source = Path("app/reportData.ts").read_text(encoding="utf-8")
report_json = report_source.split("export const reportPeriods = ", 1)[1].rsplit(" as const;", 1)[0]
report = json.loads(report_json)
output["capacity"] = {period: report[period]["capacity"] for period in PERIODS}
# Закрытый август берём из подтверждённого факта ParkOps. Дневной разбивки
# этого источника нет, поэтому не распределяем сумму по дням искусственно.
for direction in ("all", "B2C", "B2B"):
    source = report["august"]["total" if direction == "all" else direction]["fact"]
    output["periods"]["august"]["metrics"]["fact"][direction] = {
        "sum": int(source["sum"]),
        "count": int(source["count"]),
        "series": [{"key": "august-total", "label": "Август", "sum": int(source["sum"]), "count": int(source["count"]), "weekend": False}],
        "source": "ParkOps — закрытый факт",
    }
for period, period_data in output["periods"].items():
    source_managers = report[period]["managers"]
    for record in period_data["managers"].values():
        match = next((item for item in source_managers if item["name"] == record["name"] and item["direction"] == record["direction"]), None)
        record["plan"] = int(match.get("plan", 0)) if match else 0

Path("prototype/actual-data.js").write_text("window.ACTUAL_REPORT_DATA=" + json.dumps(output, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
print("prototype/actual-data.js generated")
