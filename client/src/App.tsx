import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { WalletProvider } from "@/lib/wallet-context";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import AboutPage from "@/pages/about";
import FeaturesPage from "@/pages/features";
import ArchitecturePage from "@/pages/architecture";
import UMLPage from "@/pages/uml";
import WalletPage from "@/pages/wallet";
import TransactionsPage from "@/pages/transactions";
import AdminDashboard from "@/pages/dashboard/admin/index";
import AdminSchedules from "@/pages/dashboard/admin/schedules";
import AdminRooms from "@/pages/dashboard/admin/rooms";
import AdminClasses from "@/pages/dashboard/admin/classes";
import AdminLecturers from "@/pages/dashboard/admin/lecturers";
import AdminValidation from "@/pages/dashboard/admin/validation";
import AdminTransactions from "@/pages/dashboard/admin/transactions";
import LecturerDashboard from "@/pages/dashboard/lecturer/index";
import LecturerSchedules from "@/pages/dashboard/lecturer/schedules";
import LecturerRequests from "@/pages/dashboard/lecturer/requests";
import LecturerValidation from "@/pages/dashboard/lecturer/validation";
import LecturerTransactions from "@/pages/dashboard/lecturer/transactions";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/architecture" component={ArchitecturePage} />
      <Route path="/uml" component={UMLPage} />
      <Route path="/wallet" component={WalletPage} />
      <Route path="/transactions" component={TransactionsPage} />
      <Route path="/dashboard/admin" component={AdminDashboard} />
      <Route path="/dashboard/admin/schedules" component={AdminSchedules} />
      <Route path="/dashboard/admin/rooms" component={AdminRooms} />
      <Route path="/dashboard/admin/classes" component={AdminClasses} />
      <Route path="/dashboard/admin/lecturers" component={AdminLecturers} />
      <Route path="/dashboard/admin/validation" component={AdminValidation} />
      <Route path="/dashboard/admin/transactions" component={AdminTransactions} />
      <Route path="/dashboard/lecturer" component={LecturerDashboard} />
      <Route path="/dashboard/lecturer/schedules" component={LecturerSchedules} />
      <Route path="/dashboard/lecturer/requests" component={LecturerRequests} />
      <Route path="/dashboard/lecturer/validation" component={LecturerValidation} />
      <Route path="/dashboard/lecturer/transactions" component={LecturerTransactions} />
      <Route path="/dashboard/student" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WalletProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WalletProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
