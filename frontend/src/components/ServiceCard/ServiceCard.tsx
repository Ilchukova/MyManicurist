import type { Service } from "../../types";
import { formatPrice } from "../../utils";
import styles from "./ServiceCard.module.css";
export default function ServiceCard({service, selected, onSelect}:{service:Service;selected?:boolean;onSelect?:()=>void}){return <button type="button" onClick={onSelect} className={[styles.card,selected?styles.selected:""].join(" ")}><span><b>{service.name}</b><small>{service.durationMin} мин</small></span><strong>{formatPrice(service.price)}</strong></button>}
