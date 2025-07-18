import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Students from "./pages/Students";
import Staff from "./pages/Staff";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
      <Route path="/staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Cours - En développement</h1></div></ProtectedRoute>} />
      <Route path="/schedule" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Emploi du temps - En développement</h1></div></ProtectedRoute>} />
      <Route path="/finances" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Finances - En développement</h1></div></ProtectedRoute>} />
      <Route path="/communications" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Communications - En développement</h1></div></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Paramètres - En développement</h1></div></ProtectedRoute>} />
      <Route path="/my-courses" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Mes cours - En développement</h1></div></ProtectedRoute>} />
      <Route path="/my-students" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Mes étudiants - En développement</h1></div></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Messages - En développement</h1></div></ProtectedRoute>} />
      <Route path="/grades" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Notes - En développement</h1></div></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Paiements - En développement</h1></div></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
