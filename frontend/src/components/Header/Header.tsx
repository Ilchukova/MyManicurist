import { Link } from "react-router-dom";
import { useAppStore } from "../../store";
import { APP_NAME } from "../../config";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAppStore();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.mark}>M</span>
          <span>{APP_NAME}</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/catalog">Мастера</Link>
          <Link to="/masters-table">Masters Table</Link>
          <Link to="/">О сервисе</Link>

          {user?.role === "client" && (
            <Link to="/account">Мои записи</Link>
          )}

          {user?.role === "master" && (
            <Link to="/master-cabinet">Кабинет</Link>
          )}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              <span className={styles.user}>{user.name}</span>
              <button onClick={logout} className={styles.logout}>
                Выйти
              </button>
            </>
          ) : (
            <Link to="/auth" className={styles.login}>
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}