
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Navigation routes from Sidebar */}
          <Route path="/contacts" element={<Index />} />
          <Route path="/deals" element={<Index />} />
          <Route path="/tasks" element={<Index />} />
          <Route path="/calendar" element={<Index />} />
          <Route path="/email" element={<Index />} />
          <Route path="/chat" element={<Index />} />
          <Route path="/companies" element={<Index />} />
          <Route path="/settings" element={<Index />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
