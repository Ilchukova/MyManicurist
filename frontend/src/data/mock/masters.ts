import type { Master } from "../../types";

export const districts = ["Все районы", "Центр", "Эжва", "Орбита", "Тентюково"];
export const allStyleTags = ["минимализм", "френч", "тонкие линии", "наращивание", "дизайн", "однотон"];

// Фотографии работ подобраны отдельно от портретов мастеров.
// Пользовательские Pinterest-ссылки сохранены как реальные изображения портфолио.
const portfolioImages = {
  pin1: "https://i.pinimg.com/1200x/08/1c/07/081c07696937809fdd15785c79c17d5b.jpg",
  pin2: "https://i.pinimg.com/736x/11/6e/12/116e120f7819cd79d5b3f180c7482390.jpg",
  pin3: "https://i.pinimg.com/736x/b1/7d/da/b17dda45eb283e24fda6bfdd373abe9b.jpg",
  pin4: "https://i.pinimg.com/736x/45/f0/25/45f0255a1c36ac9be214983c65a95729.jpg",
  pin5: "https://i.pinimg.com/1200x/53/04/8f/53048fc78005e60eb2d1560c7a857065.jpg",
};

const extraPortfolioImages = [
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1607779097040-26e80aa78e9d?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1599948128020-9a44505b0d9a?auto=format&fit=crop&w=900&q=86",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=86",
];

export const masters: Master[] = [
  {
    id: "m1", name: "Алина Петрова", district: "Центр", styleTags: ["минимализм", "тонкие линии"],
    avatar: "https://i.pinimg.com/736x/f4/7c/46/f47c46f36b3b2c655777b6ead01f31ec.jpg",
    status: "unavailable", rating: 4.9, reviewCount: 84,
    bio: "Делаю аккуратный маникюр в спокойной эстетике. Люблю чистую форму, нюд и тонкие детали.",
    services: [
      { masterId: "m1", id: "s1", name: "Маникюр + гель-лак", price: 1200, durationMin: 90 },
      { masterId: "m1", id: "s2", name: "Коррекция + покрытие", price: 1600, durationMin: 120 },
    ],
    portfolio: [
      { id: "p1", image: portfolioImages.pin1, caption: "Нюдовый минимализм" },
      { id: "p2", image: portfolioImages.pin2, caption: "Тонкая линия" },
      { id: "p3", image: portfolioImages.pin3, caption: "Молочный оттенок" },
    ],
    reviews: [{ id: "r1", author: "Оля", rating: 5, text: "Очень аккуратно, форма идеальная. Всё держалось почти месяц." }], availableSlots: [],
  },
  {
    id: "m2", name: "Мария Соколова", district: "Центр", styleTags: ["френч", "тонкие линии"],
    avatar: "https://i.pinimg.com/736x/71/8a/06/718a06d99408e8042b28dff6f37a28bc.jpg",
    status: "active", rating: 5.0, reviewCount: 126,
    bio: "Специализируюсь на классическом френче и аккуратных дизайнах. Работаю бережно и без спешки.",
    services: [
      { masterId: "m2", id: "s3", name: "Маникюр + гель-лак", price: 1300, durationMin: 90 },
      { masterId: "m2", id: "s4", name: "Французский маникюр", price: 1500, durationMin: 100 },
    ],
    portfolio: [
      { id: "p4", image: portfolioImages.pin4, caption: "Классический френч" },
      { id: "p5", image: portfolioImages.pin5, caption: "Нюд + блеск" },
      { id: "p6", image: extraPortfolioImages[0], caption: "Молочная база" },
    ],
    reviews: [
      { id: "r2", author: "Настя", rating: 5, text: "Френч очень тонкий и аккуратный. Вернусь ещё." },
      { id: "r3", author: "Юля", rating: 5, text: "Приятная атмосфера и очень красивый результат." },
    ], availableSlots: ["24 сен, 14:00", "24 сен, 16:30", "25 сен, 11:00", "25 сен, 15:30"],
  },
  {
    id: "m3", name: "Виктория Ким", district: "Эжва", styleTags: ["дизайн", "наращивание"],
    avatar: "https://i.pinimg.com/736x/38/5d/bf/385dbffd4965578fc7759e03e8175672.jpg",
    status: "active", rating: 4.8, reviewCount: 73,
    bio: "Люблю выразительный дизайн, необычные фактуры и красивую форму. Можно прийти со своей идеей.",
    services: [
      { masterId: "m3", id: "s5", name: "Наращивание", price: 2000, durationMin: 150 },
      { masterId: "m3", id: "s6", name: "Дизайн", price: 150, durationMin: 15 },
    ],
    portfolio: [
      { id: "p7", image: extraPortfolioImages[1], caption: "Акцентный дизайн" },
      { id: "p8", image: extraPortfolioImages[2], caption: "Длина + форма" },
      { id: "p9", image: extraPortfolioImages[3], caption: "Объёмные детали" },
    ],
    reviews: [{ id: "r4", author: "Диана", rating: 5, text: "Работы просто произведение искусства. Очень понравилось." }], availableSlots: ["23 сен, 10:00", "26 сен, 13:00", "27 сен, 17:00"],
  },
  {
    id: "m4", name: "Полина Егорова", district: "Орбита", styleTags: ["однотон", "минимализм"],
    avatar: "https://i.pinimg.com/736x/3a/1b/4d/3a1b4d5270981f9b06d9d76ef3bd0356.jpg",
    status: "active", rating: 4.9, reviewCount: 58,
    bio: "Быстрые записи, чистый маникюр и спокойные оттенки. Идеально, если хочется красиво без лишнего.",
    services: [
      { masterId: "m4", id: "s7", name: "Экспресс-покрытие", price: 900, durationMin: 50 },
      { masterId: "m4", id: "s8", name: "Маникюр + покрытие", price: 1400, durationMin: 90 },
    ],
    portfolio: [
      { id: "p10", image: extraPortfolioImages[4], caption: "Однотонное покрытие" },
      { id: "p11", image: extraPortfolioImages[5], caption: "Пастельный минимализм" },
      { id: "p12", image: extraPortfolioImages[6], caption: "Нюд" },
    ],
    reviews: [{ id: "r5", author: "Света", rating: 5, text: "Успела перед работой, всё очень аккуратно и быстро." }], availableSlots: ["23 сен, 18:00", "24 сен, 19:00", "26 сен, 12:30"],
  },
];

export function findSimilarMasters(master: Master, all: Master[]): Master[] {
  return all
    .filter((m) => m.id !== master.id && m.status === "active")
    .map((m) => ({ master: m, overlap: m.styleTags.filter((t) => master.styleTags.includes(t)).length }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.master);
}
