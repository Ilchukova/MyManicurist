import { useEffect, useState } from "react";
import type { Master } from "../types";
import { getMasters } from "../api";

export function useMasters() {
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getMasters().then((data) => {
      if (active) {
        setMasters(data);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  return { masters, loading };
}
