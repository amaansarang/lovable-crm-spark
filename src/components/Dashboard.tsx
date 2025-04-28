
import React from "react";
import { AreaChart, BarChart3, Calendar, CheckSquare, DollarSign, Users } from "lucide-react";
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

// Sales data for charts
const salesData = [
  { name: "Jan", deals: 4, revenue: 18000 },
  { name: "Feb", deals: 5, revenue: 22000 },
  { name: "Mar", deals: 7, revenue: 32000 },
  { name: "Apr", deals: 5, revenue: 24000 },
  { name: "May", deals: 8, revenue: 36000 },
  { name: "Jun", deals: 9, revenue: 42000 },
];

// Lead source data for charts
const leadSourceData = [
  { source: "Website", leads: 45 },
  { source: "Email", leads: 32 },
  { source: "Social", leads: 28 },
  { source: "Referral", leads: 18 },
  { source: "Other", leads: 12 },
];

const activityIcons: Record<string, React.ReactNode> = {
  call: <Phone className="h-4 w-4 text-blue-500" />,
  email: <Mail className="h-4 w-4 text-indigo-500" />,
  meeting: <Calendar className="h-4 w-4 text-purple-500" />,
  note: <FileText className="h-4 w-4 text-amber-500" />,
  task: <CheckCircle className="h-4 w-4 text-green-500" />,
};

// Add missing imports
import { Phone, Mail, FileText, CheckCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="New Leads"
          value={dashboardStats.newLeads}
          icon={<Users className="h-4 w-4" />}
          trend={{ direction: "up", value: "+8.2%" }}
        />
        <StatCard
          title="Active Deals"
          value={dashboardStats.activeDeals}
          icon={<BarChart3 className="h-4 w-4" />}
          trend={{ direction: "up", value: "+3.1%" }}
        />
        <StatCard
          title="Revenue"
          value={`$${dashboardStats.revenue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ direction: "up", value: "+14.5%" }}
        />
        <StatCard
          title="Conversion Rate"
          value={`${dashboardStats.conversionRate}%`}
          icon={<AreaChart className="h-4 w-4" />}
          trend={{ direction: "down", value: "-2.3%" }}
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and deals closed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChartComponent data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChartComponent>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Sales Performance Chart */}
        <DashboardChart data={salesData} title="Sales Performance" />
      </div>
      
      {/* Tasks and Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Your upcoming tasks</CardDescription>
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
                    <p className="font-medium">Follow up with Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Due in 2 days</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">Medium</span>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Send proposal to Acme Inc</p>
                    <p className="text-sm text-muted-foreground">Due tomorrow</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded">High</span>
              </div>
              
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Schedule demo with client</p>
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
                <CardDescription>Latest actions across the CRM</CardDescription>
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
