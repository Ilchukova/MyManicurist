import type { Review } from "../../types";
import styles from "./ReviewCard.module.css";
export default function ReviewCard({review}:{review:Review}){return <article className={styles.card}><div><b>{review.author}</b><span> ★ {review.rating}</span></div><p>{review.text}</p></article>}
