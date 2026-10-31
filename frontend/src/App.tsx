import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppStoreProvider } from "./store";
import AppRoutes from "./routes";
import "./assets/styles/global.css";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppStoreProvider>
        <div className="app-shell">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AppStoreProvider>
    </BrowserRouter>
  );
}