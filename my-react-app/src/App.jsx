import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";

import DashboardPage from "./components/Pages/DashboardPage";
import ApiDataConnectionPage from "./components/Pages/ApiDataConnectionPage";
import AllMaterialsPage from "./components/Pages/AllMaterialsPage";
import CategoriesPage from "./components/Pages/CategoriesPage";
import RunMatchingPage from "./components/Pages/RunMatchingPage";
import MatchResultsPage from "./components/Pages/MatchResultsPage";
import ConflictsPage from "./components/Pages/ConflictsPage";
import ReviewPage from "./components/Pages/ReviewPage";
import StandardMaterialsPage from "./components/Pages/StandardMaterialsPage";
import CpseMappingPage from "./components/Pages/CpseMappingPage";
import AnalyticsPage from "./components/Pages/AnalyticsPage";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;

      case "all-materials":
        return <AllMaterialsPage />;

      case "categories":
        return <CategoriesPage />;

      case "run-matching":
        return <RunMatchingPage />;

      case "match-results":
        return <MatchResultsPage />;

      case "conflicts":
        return <ConflictsPage />;

      case "review":
      case "review-queue":
        return <ReviewPage />;

      case "standard-materials":
        return <StandardMaterialsPage />;

      case "cpse-mapping":
        return <CpseMappingPage />;

      case "analytics":
      case "dashboard":
        return <AnalyticsPage />;

        case "api-data-connection":
        return <ApiDataConnectionPage />;

      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 select-none">
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main App Layout */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header / TopBar */}
        <TopBar activePage={activePage} />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}