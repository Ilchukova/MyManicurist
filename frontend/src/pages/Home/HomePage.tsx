import { useEffect, useState } from "react";
import { getMasters } from "../../api/mastersApi";
import { Link } from "react-router-dom";
import type { Master } from "../../types";
import MasterCard from "../../components/MasterCard";

const heroImage =
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=88";

export default function HomePage() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getMasters()
      .then((data) => {
        setMasters(data);
      })
      .catch((error) => {
        console.error("Не удалось загрузить мастеров:", error);
        setMasters([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const featured = masters
    .filter((m) => m.status === "active")
    .slice(0, 3);

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">Мастера маникюра рядом</div>

          <h1>
            Красивые ногти.
            <br />
            <em>Свободное окошко.</em>
          </h1>

          <p>
            Находите мастера по стилю, смотрите реальные работы и
            записывайтесь без переписок.
          </p>

          <div className="hero-actions">
            <Link to="/catalog" className="btn btn-primary">
              Найти мастера <span>→</span>
            </Link>

            <a href="#how" className="text-link">
              Как это работает
            </a>
          </div>

          <div className="hero-note">
            <span className="note-dot" /> Только актуальные профили и свободные
            записи
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo">
            <img src={heroImage} alt="Маникюр" />
          </div>

          <div className="floating-card">
            <span className="mini-check">✓</span>

            <div>
              <strong>Свободно сегодня</strong>
              <small>Мария Соколова · Центр</small>
            </div>
          </div>

          <div className="hero-label">01 / 04</div>
        </div>
      </section>

      <section className="shell trust-row">
        <div>
          <strong>4.9</strong>
          <span>средняя оценка</span>
        </div>

        <div>
          <strong>120+</strong>
          <span>мастеров в каталоге</span>
        </div>

        <div>
          <strong>1 800+</strong>
          <span>записей через сервис</span>
        </div>
      </section>

      <section className="section shell" id="how">
        <div className="section-head">
          <div>
            <div className="eyebrow">Просто и понятно</div>

            <h2>
              Найти своего мастера —
              <br />
              <em>несколько минут</em>
            </h2>
          </div>

          <Link to="/catalog" className="outline-link">
            Перейти в каталог →
          </Link>
        </div>

        <div className="steps">
          <div className="step">
            <span>01</span>
            <h3>Выберите стиль</h3>
            <p>
              Минимализм, френч, дизайн или однотонное покрытие.
            </p>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Посмотрите работы</h3>
            <p>
              Сравните портфолио, цены, отзывы и район.
            </p>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Запишитесь онлайн</h3>
            <p>
              Выберите свободное время и подтвердите запись.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft" id="about">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow">Мастера рядом</div>

              <h2>
                Посмотрите, кто <em>свободен</em>
              </h2>
            </div>

            <Link to="/catalog" className="outline-link">
              Все мастера →
            </Link>
          </div>

          {loading ? (
            <div>Загрузка мастеров...</div>
          ) : (
            <div className="card-grid">
              {featured.map((m) => (
                <MasterCard key={m.id} master={m} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="shell cta-section">
        <div className="cta-copy">
          <div className="eyebrow">Для мастеров</div>

          <h2>
            Ваши работы должны
            <br />
            <em>говорить за вас</em>
          </h2>

          <p>
            Создайте профиль, покажите портфолио и принимайте записи в одном
            месте.
          </p>

          <Link to="/auth" className="btn btn-dark">
            Создать профиль →
          </Link>
        </div>

        <div className="cta-collage">
          {masters.length >= 3 && (
            <>
              <img
                src={masters[2].portfolio[1].image}
                alt="Работа мастера"
              />

              <img
                src={masters[1].portfolio[0].image}
                alt="Работа мастера"
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}