
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/components/Dashboard";
import ContactsList from "@/components/ContactsList";
import DealsPipeline from "@/components/DealsPipeline";
import TaskManager from "@/components/TaskManager";
import ProductsManagement from "@/components/ProductsManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  useEffect(() => {
    // Map routes to tab values
    const pathToTab: Record<string, string> = {
      "/": "dashboard",
      "/products": "products",
      "/purchases": "purchases",
      "/vendors": "vendors",
      "/contacts": "contacts",
      "/deals": "deals",
      "/tasks": "tasks"
    };
    
    const newActiveTab = pathToTab[location.pathname] || "dashboard";
    setActiveTab(newActiveTab);
  }, [location.pathname]);

  return (
    <AppLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b">
          <TabsList className="bg-transparent">
            <TabsTrigger value="dashboard" className="text-lg">Dashboard</TabsTrigger>
            <TabsTrigger value="products" className="text-lg">Products</TabsTrigger>
            <TabsTrigger value="purchases" className="text-lg">Purchases</TabsTrigger>
            <TabsTrigger value="vendors" className="text-lg">Vendors</TabsTrigger>
            <TabsTrigger value="contacts" className="text-lg">Contacts</TabsTrigger>
            <TabsTrigger value="deals" className="text-lg">Deals</TabsTrigger>
            <TabsTrigger value="tasks" className="text-lg">Tasks</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
          <Dashboard />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6 animate-fade-in">
          <ProductsManagement />
        </TabsContent>
        
        <TabsContent value="purchases" className="space-y-6 animate-fade-in">
          <div className="text-center p-10">
            <h2 className="text-2xl font-bold mb-4">Purchase Orders</h2>
            <p className="text-muted-foreground">
              Track and manage purchase orders, approve requisitions, 
              and monitor delivery status from your vendors.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="vendors" className="space-y-6 animate-fade-in">
          <div className="text-center p-10">
            <h2 className="text-2xl font-bold mb-4">Vendor Management</h2>
            <p className="text-muted-foreground">
              Maintain your vendor database, track performance metrics,
              and manage vendor relationships effectively.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="contacts" className="space-y-6 animate-fade-in">
          <ContactsList />
        </TabsContent>
        
        <TabsContent value="deals" className="space-y-6 animate-fade-in">
          <DealsPipeline />
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-6 animate-fade-in">
          <TaskManager />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Index;
