
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Booking, CurrentUser } from "../types";
import { mockBookings } from "../data/mock";

const STORAGE_KEY = "mymanicurist:user";

interface AppStore {
  user: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
}

const AppStoreContext = createContext<AppStore | null>(null);

function getStoredUser(): CurrentUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("name" in parsed) ||
      typeof parsed.name !== "string" ||
      !("role" in parsed) ||
      (parsed.role !== "client" && parsed.role !== "master")
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed as CurrentUser;
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Хранилище может быть недоступно в браузере.
    }

    return null;
  }
}

export function AppStoreProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<CurrentUser | null>(getStoredUser);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Не удалось сохранить пользователя:", error);
    }
  }, [user]);

  const value = useMemo<AppStore>(
    () => ({
      user,
      login: setUser,
      logout: () => setUser(null),
      bookings,
      addBooking: (booking) =>
        setBookings((prev) => [...prev, booking]),
      cancelBooking: (id) =>
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === id
              ? { ...booking, status: "cancelled" }
              : booking
          )
        ),
    }),
    [user, bookings]
  );

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppStoreContext);

  if (!context) {
    throw new Error(
      "useAppStore must be used inside AppStoreProvider"
    );
  }

  return context;
}
