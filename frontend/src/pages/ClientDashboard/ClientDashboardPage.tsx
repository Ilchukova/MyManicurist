import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppState } from "../../store";
import { masters } from "../../data/mock";

type Tab = "upcoming" | "past" | "cancelled";
export default function ClientDashboardPage() {
  const { user, bookings, cancelBooking } = useAppState(); const [tab, setTab] = useState<Tab>("upcoming");
  if (!user || user.role !== "client") return <Navigate to="/auth" replace />;
  const mine = bookings.filter((b) => b.clientName === user.name && b.status === tab);
  return <div className="shell page dashboard-page"><div className="dashboard-head"><div><div className="eyebrow">Личный кабинет</div><h1>Мои <em>записи</em></h1><p>Здравствуйте, {user.name}. Здесь собраны ваши записи.</p></div><Link to="/catalog" className="btn btn-primary">Найти мастера →</Link></div><div className="dashboard-tabs">{([["upcoming","Предстоящие"],["past","Прошедшие"],["cancelled","Отменённые"]] as const).map(([key,label]) => <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label}</button>)}</div><div className="booking-list">{mine.length === 0 && <div className="empty-state"><strong>Здесь пока пусто</strong><p>Найдите мастера и запишитесь на удобное время.</p><Link to="/catalog" className="text-link">Перейти в каталог →</Link></div>}{mine.map((b) => { const master = masters.find((m) => m.id === b.masterId); const service = master?.services.find((s) => s.id === b.serviceId); return <div className="booking-card" key={b.id}><img src={master?.portfolio[0].image} alt=""/><div className="booking-card-main"><span className="booking-date">{b.slot}</span><h3>{master?.name}</h3><p>{service?.name} · {service?.price.toLocaleString("ru-RU")} ₽</p></div><div className="booking-card-action">{tab === "upcoming" ? <button className="btn btn-outline" onClick={() => cancelBooking(b.id)}>Отменить</button> : <span className={`status-pill status-${b.status}`}>{b.status === "cancelled" ? "Отменена" : "Завершена"}</span>}</div></div>; })}</div></div>;
}
