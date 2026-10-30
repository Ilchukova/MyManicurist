import type { PortfolioItem } from "../../types";
import styles from "./Carousel.module.css";
export default function Carousel({ items }: { items: PortfolioItem[] }){return <div className={styles.grid}>{items.map(item=><figure key={item.id}><img src={item.image} alt={item.caption}/><figcaption>{item.caption}</figcaption></figure>)}</div>}
