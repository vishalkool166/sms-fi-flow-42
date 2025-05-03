
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

// Layout
import AppLayout from "@/components/AppLayout";

// Pages
import OnboardingPage from "@/pages/OnboardingPage";
import HomePage from "@/pages/HomePage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import InsightsPage from "@/pages/InsightsPage";
import ScanSMSPage from "@/pages/ScanSMSPage";
import AddTransactionPage from "@/pages/AddTransactionPage";
import SettingsPage from "@/pages/SettingsPage";
import BanksPage from "@/pages/BanksPage";
import CardsPage from "@/pages/CardsPage";
import LoansPage from "@/pages/LoansPage";
import DebtsPage from "@/pages/DebtsPage";
import BudgetsPage from "@/pages/BudgetsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/onboarding" element={<OnboardingPage />} />
            
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/scan-sms" element={<ScanSMSPage />} />
              <Route path="/add-transaction" element={<AddTransactionPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/banks" element={<BanksPage />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/debts" element={<DebtsPage />} />
              <Route path="/budgets" element={<BudgetsPage />} />
              <Route path="/accounts" element={<Navigate to="/banks" replace />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
