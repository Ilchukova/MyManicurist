import { useEffect, useMemo, useState } from "react";
import { fetchMasters } from "../../api/mastersApi";
import { allStyleTags, districts } from "../../data/mock";
import type { Master } from "../../types";
import MasterCard from "../../components/MasterCard";

export default function CatalogPage() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [district, setDistrict] = useState("Все районы");
  const [style, setStyle] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadMasters() {
      try {
        setLoading(true);
        setError("");

        const response = await fetchMasters(1, 12);

        if (!cancelled) {
          setMasters(response.items);
        }
      } catch (err) {
        console.error("Не удалось загрузить мастеров:", err);

        if (!cancelled) {
          setMasters([]);
          setError(
            "Не удалось загрузить мастеров. Проверьте подключение и попробуйте обновить страницу."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMasters();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () =>
      masters.filter(
        (master) =>
          (district === "Все районы" ||
            master.district === district) &&
          (!style || master.styleTags?.includes(style)) &&
          (!query ||
            master.name.toLowerCase().includes(query.toLowerCase()))
      ),
    [masters, district, style, query]
  );

  return (
    <div className="shell page page-catalog">
      <div className="catalog-head">
        <div>
          <div className="eyebrow">Найти мастера</div>
          <h1>
            Каталог <em>мастеров</em>
          </h1>
          <p>Портфолио, цены и свободные окошки в одном месте.</p>
        </div>

        <div className="search-wrap">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по имени"
          />
        </div>
      </div>

      <div className="filter-panel">
        <div className="filter-line">
          <span className="filter-label">Район</span>

          {districts.map((item) => (
            <button
              key={item}
              className={`filter-chip ${
                district === item ? "active" : ""
              }`}
              onClick={() => setDistrict(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="filter-line">
          <span className="filter-label">Стиль</span>

          <button
            className={`filter-chip ${!style ? "active" : ""}`}
            onClick={() => setStyle(null)}
          >
            Любой
          </button>

          {allStyleTags.map((item) => (
            <button
              key={item}
              className={`filter-chip ${
                style === item ? "active" : ""
              }`}
              onClick={() =>
                setStyle(style === item ? null : item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="results-row">
        <span>
          Найдено мастеров: <strong>{filtered.length}</strong>
        </span>
        <span className="muted">
          Сначала с ближайшей записью
        </span>
      </div>

      {loading ? (
        <div className="empty-state">Загрузка мастеров...</div>
      ) : error ? (
        <div className="empty-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </div>
      ) : filtered.length > 0 ? (
        <div className="card-grid card-grid-3">
          {filtered.map((master) => (
            <MasterCard key={master.id} master={master} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          Ничего не нашли. Попробуйте изменить фильтры.
        </div>
      )}
    </div>
  );
}