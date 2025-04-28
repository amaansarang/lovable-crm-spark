
import React from "react";
import { AreaChart, BarChart3, CheckSquare, DollarSign, Users, Package2, Store, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart as AreaChartComponent,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "./StatCard";
import { dashboardStats, activities } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";
import DashboardChart from "./DashboardChart";

// Add missing imports
import { Phone, Mail, FileText, CheckCircle, Calendar } from "lucide-react";

// Product purchase data for charts
const purchaseData = [
  { name: "Jan", orders: 12, spend: 24000 },
  { name: "Feb", orders: 15, spend: 28000 },
  { name: "Mar", orders: 18, spend: 35000 },
  { name: "Apr", orders: 14, spend: 26000 },
  { name: "May", orders: 19, spend: 38000 },
  { name: "Jun", orders: 22, spend: 45000 },
];

// Product category data
const categoryData = [
  { category: "Hardware", spend: 45000 },
  { category: "Software", spend: 32000 },
  { category: "Services", spend: 28000 },
  { category: "Office", spend: 18000 },
  { category: "Other", spend: 12000 },
];

const activityIcons: Record<string, React.ReactNode> = {
  call: <Phone className="h-4 w-4 text-blue-500" />,
  email: <Mail className="h-4 w-4 text-indigo-500" />,
  meeting: <Calendar className="h-4 w-4 text-purple-500" />,
  note: <FileText className="h-4 w-4 text-amber-500" />,
  task: <CheckCircle className="h-4 w-4 text-green-500" />,
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Procurement Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Products"
          value="345"
          icon={<Package2 className="h-4 w-4" />}
          trend={{ direction: "up", value: "+12" }}
        />
        <StatCard
          title="Vendors"
          value="48"
          icon={<Store className="h-4 w-4" />}
          trend={{ direction: "up", value: "+3" }}
        />
        <StatCard
          title="Purchase Orders"
          value="127"
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{ direction: "up", value: "+14" }}
        />
        <StatCard
          title="Monthly Spend"
          value={`$${dashboardStats.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ direction: "up", value: "+8.5%" }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Procurement Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Procurement Overview</CardTitle>
            <CardDescription>Monthly orders and spend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChartComponent data={purchaseData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))' 
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="spend"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorSpend)"
                  />
                </AreaChartComponent>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Category Spend Chart */}
        <DashboardChart 
          data={purchaseData} 
          title="Purchase Performance"
          dataKeys={["orders", "spend"]}
        />
      </div>
      
      {/* Tasks and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Procurement Tasks</CardTitle>
                <CardDescription>Your upcoming procurement tasks</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Review vendor catalog updates</p>
                    <p className="text-sm text-muted-foreground">Due in 2 days</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">Medium</span>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Approve purchase order #1234</p>
                    <p className="text-sm text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded">High</span>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Inventory reconciliation</p>
                    <p className="text-sm text-muted-foreground">Due next week</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">Low</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest procurement activities</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {activityIcons[activity.type] || <FileText className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
