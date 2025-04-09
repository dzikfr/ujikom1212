import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/commons/Layout";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import ServiceCategoryPage from "./pages/ServiceCategoryPage";
import DoctorPage from "./pages/DoctorPage";
import ServicePage from "./pages/ServicePage";
import TransactionPage from "./pages/TransactionPage";
import TransactionReportPage from "./pages/TransactionReportPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<Layout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="service-categories" element={<ServiceCategoryPage />} />
            <Route path="doctors" element={<DoctorPage />} />
            <Route path="services" element={<ServicePage />}/>
            <Route path="transactions" element={<TransactionPage />}/>
            <Route path="transactions-reports" element={<TransactionReportPage />}/>
          </Route>
        {/* </Route> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
