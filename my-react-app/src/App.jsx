import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";

// Page Components
import DashboardPage from "./components/Pages/DashboardPage";
import AllMaterialsPage from "./components/Pages/AllMaterialsPage";
import StandardMaterialsPage from "./components/Pages/StandardMaterialsPage";
import CategoriesPage from "./components/Pages/CategoriesPage";
import RunMatchingPage from "./components/Pages/RunMatchingPage";
import ApiDataConnectionPage from "./components/Pages/ApiDataConnectionPage";

export default function App() {
  const [activePage, setActivePage] = useState("standard-materials");

  // Page Routing Logic
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "all-materials":
        return <AllMaterialsPage />;
      case "standard-materials":
        return <StandardMaterialsPage />;
      case "categories":
        return <CategoriesPage />;
      case "run-matching":
        return <RunMatchingPage />;
      case "api-integration":
      case "api-data-connection":
        return <ApiDataConnectionPage />;
      default:
        return <StandardMaterialsPage />;
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