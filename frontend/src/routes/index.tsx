import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import AuthPage from "../pages/Auth/AuthPage";
import CatalogPage from "../pages/Catalog/CatalogPage";
import MasterProfilePage from "../pages/MasterProfile/MasterProfilePage";
import BookingPage from "../pages/Booking/BookingPage";
import ClientDashboardPage from "../pages/ClientDashboard/ClientDashboardPage";
import MasterDashboardPage from "../pages/MasterDashboard/MasterDashboardPage";
import MastersTablePage from "../pages/MastersTable/MastersTablePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/catalog" element={<CatalogPage />} />

      <Route path="/masters-table" element={<MastersTablePage />} />

      <Route path="/masters/:id" element={<MasterProfilePage />} />
      <Route path="/masters/:id/book" element={<BookingPage />} />

      <Route path="/account" element={<ClientDashboardPage />} />
      <Route path="/master-cabinet" element={<MasterDashboardPage />} />
    </Routes>
  );
}