import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Loader from "../commonComponents/Loader";
import NotFound from "../commonComponents/NotFound";

// Lazy-loaded sub-category pages
const Investments = lazy(() => import("../pages/myFinance/Investments"));
// const Savings = lazy(() => import("../pages/Savings"));
// const Loan = lazy(() => import("../pages/Loan"));
// const Assets = lazy(() => import("../pages/Assets"));
// const Lent = lazy(() => import("../pages/Lent"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/finance/investments" replace />} />
          <Route path="/finance" element={<Layout />}>
            <Route path="investments" element={<Investments />} />
            {/* <Route path="savings" element={<Savings />} />
            <Route path="loan" element={<Loan />} />
            <Route path="assets" element={<Assets />} />
            <Route path="lent" element={<Lent />} /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
