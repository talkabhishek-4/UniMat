import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import TopBar from "./components/topbar";
import DashboardPage from "./components/Pages/DashboardPage";
import AllMaterialsPage from "./components/Pages/AllMaterialsPage";
import RunMatchingPage from "./components/Pages/RunMatchingPage";
import ApiDataConnectionPage from "./components/Pages/ApiDataConnectionPage";

const App = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "all-materials":
        return <AllMaterialsPage />;
      case "run-matching":
        return <RunMatchingPage />;
      case "api-integration":
      case "api-data-connection":
        return <ApiDataConnectionPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar activePage={activePage} />
        <main className="flex-1 p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;