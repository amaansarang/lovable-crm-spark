
import AppLayout from "@/layouts/AppLayout";
import Dashboard from "@/components/Dashboard";
import ContactsList from "@/components/ContactsList";
import DealsPipeline from "@/components/DealsPipeline";
import TaskManager from "@/components/TaskManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <AppLayout>
      <Tabs defaultValue="dashboard" className="space-y-6">
        <div className="border-b">
          <TabsList className="bg-transparent">
            <TabsTrigger value="dashboard" className="text-lg">Dashboard</TabsTrigger>
            <TabsTrigger value="contacts" className="text-lg">Contacts</TabsTrigger>
            <TabsTrigger value="deals" className="text-lg">Deals</TabsTrigger>
            <TabsTrigger value="tasks" className="text-lg">Tasks</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
          <Dashboard />
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
