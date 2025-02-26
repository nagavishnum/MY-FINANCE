import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../commonComponents/Loader";
import NotFound from "../commonComponents/NotFound";

// Lazy-loaded sub-category pages
const Investments = lazy(() => import("../pages/myFinance/investments/Investments"));
// const Savings = lazy(() => import("../pages/Savings"));
// const Loan = lazy(() => import("../pages/Loan"));
// const Assets = lazy(() => import("../pages/Assets"));
// const Lent = lazy(() => import("../pages/Lent"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/finance/investment" replace />} />
          <Route path="/finance" element={<Layout />}>
            <Route path="investment" element={<Investments />}/>
            <Route path="savings" element={<Investments />} />
            <Route path="loan" element={<Investments />} />
            <Route path="assets" element={<Investments />} />
            <Route path="lent" element={<Investments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
