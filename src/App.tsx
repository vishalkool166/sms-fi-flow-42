
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Layout
import AppLayout from "@/components/AppLayout";

// Pages
import LandingPage from "@/pages/LandingPage";
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
import GoalsPage from "@/pages/GoalsPage";
import ProfilePage from "@/pages/ProfilePage";
import DashboardPage from "@/pages/DashboardPage";
import EnhancedAnalyticsPage from "@/pages/EnhancedAnalyticsPage";
import FinancialInsightsPage from "@/pages/FinancialInsightsPage";
import AIInsightsPage from "@/pages/AIInsightsPage";
import NotificationsPage from "@/pages/NotificationsPage";
import SearchPage from "@/pages/SearchPage";
import TransactionDetailPage from "@/pages/TransactionDetailPage";
import TransactionsPage from "@/pages/TransactionsPage";
import BillsPage from "@/pages/BillsPage";
import AddBudgetPage from "@/pages/AddBudgetPage";
import AddGoalPage from "@/pages/AddGoalPage";
import AddBankPage from "@/pages/AddBankPage";
import AddCardPage from "@/pages/AddCardPage";
import AddLoanPage from "@/pages/AddLoanPage";
import AddDebtPage from "@/pages/AddDebtPage";
import BankDetailsPage from "@/pages/BankDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="finance-theme">
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analytics" element={<EnhancedAnalyticsPage />} />
                <Route path="/insights" element={<FinancialInsightsPage />} />
                <Route path="/scan-sms" element={<ScanSMSPage />} />
                
                {/* Transaction Routes */}
                <Route path="/add-transaction" element={<AddTransactionPage />} />
                <Route path="/edit-transaction/:id" element={<AddTransactionPage />} />
                <Route path="/transaction/:id" element={<TransactionDetailPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                
                {/* Settings and Profile */}
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Bank Routes */}
                <Route path="/banks" element={<BanksPage />} />
                <Route path="/add-bank" element={<AddBankPage />} />
                <Route path="/bank/:id" element={<BankDetailsPage />} />
                <Route path="/edit-bank/:id" element={<AddBankPage />} />
                
                {/* Card Routes */}
                <Route path="/cards" element={<CardsPage />} />
                <Route path="/add-card" element={<AddCardPage />} />
                <Route path="/card/:id" element={<CardsPage />} />
                <Route path="/edit-card/:id" element={<AddCardPage />} />
                
                {/* Loan Routes */}
                <Route path="/loans" element={<LoansPage />} />
                <Route path="/add-loan" element={<AddLoanPage />} />
                <Route path="/loan/:id" element={<LoansPage />} />
                <Route path="/edit-loan/:id" element={<AddLoanPage />} />
                
                {/* Debt Routes */}
                <Route path="/debts" element={<DebtsPage />} />
                <Route path="/add-debt" element={<AddDebtPage />} />
                <Route path="/debt/:id" element={<DebtsPage />} />
                <Route path="/edit-debt/:id" element={<AddDebtPage />} />
                
                {/* Budget Routes */}
                <Route path="/budgets" element={<BudgetsPage />} />
                <Route path="/add-budget" element={<AddBudgetPage />} />
                <Route path="/budget/:id" element={<BudgetsPage />} />
                <Route path="/edit-budget/:id" element={<AddBudgetPage />} />
                
                {/* Goal Routes */}
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/add-goal" element={<AddGoalPage />} />
                <Route path="/goal/:id" element={<GoalsPage />} />
                <Route path="/edit-goal/:id" element={<AddGoalPage />} />
                
                <Route path="/accounts" element={<Navigate to="/banks" replace />} />
                <Route path="/ai-insights" element={<AIInsightsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/bills" element={<BillsPage />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
