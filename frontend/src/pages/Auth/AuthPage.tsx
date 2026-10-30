import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../../store";
import { masters } from "../../data/mock";
import { loginUser } from "../../api/usersApi";

type Mode = "login" | "register";
export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login"); const [role, setRole] = useState<"client" | "master">("client"); const [name, setName] = useState(""); const [masterId, setMasterId] = useState(masters[1].id); const { login } = useAppState(); const navigate = useNavigate();

const submit = async (e: FormEvent) => {
  e.preventDefault();

  const trimmedName = name.trim();
  if (!trimmedName) return;

  try {
    const user = await loginUser(trimmedName, role);

    login(
      role === "master"
        ? { ...user, masterId }
        : user
    );

    navigate(role === "client" ? "/catalog" : "/master-cabinet");
  } catch (error) {
    console.error("Не удалось выполнить вход:", error);
  }
};
  return <div className="auth-page shell"><div className="auth-card"><div className="eyebrow">MyManicurist</div><h1>{mode === "login" ? "С возвращением" : "Создать аккаунт"}</h1><p className="auth-sub">{mode === "login" ? "Войдите, чтобы управлять своими записями." : "Это займёт меньше минуты."}</p><div className="segmented"><button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Войти</button><button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Регистрация</button></div><form onSubmit={submit}><div className="form-field"><label>Вы входите как</label><div className="role-switch"><button type="button" className={role === "client" ? "active" : ""} onClick={() => setRole("client")}>Клиент</button><button type="button" className={role === "master" ? "active" : ""} onClick={() => setRole("master")}>Мастер</button></div></div><div className="form-field"><label htmlFor="name">Имя</label><input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" required /></div>{mode === "register" && <div className="form-field"><label>Телефон</label><input placeholder="+7 900 000-00-00" /></div>}{role === "master" && <div className="form-field"><label>Профиль мастера</label><select value={masterId} onChange={(e) => setMasterId(e.target.value)}>{masters.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>}<button className="btn btn-primary full">{mode === "login" ? "Войти в аккаунт" : "Создать аккаунт"}</button></form><div className="auth-foot">Демо-режим: данные сохраняются только во время работы приложения.</div></div></div>;
}
