import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
export default function Footer(){return <footer className={styles.footer}><div className={styles.inner}><div><div className={styles.brand}>MyManicurist</div><p>Поиск мастера и удобная онлайн-запись.</p></div><div className={styles.links}><Link to="/catalog">Каталог</Link><Link to="/auth">Войти</Link></div></div></footer>}
