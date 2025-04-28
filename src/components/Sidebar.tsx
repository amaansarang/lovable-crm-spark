
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart3, Building2, Calendar, ChevronLeft, ChevronRight, Contact2, LayoutDashboard, ListTodo, Mail, MessageCircle, Settings, Users, Package, ShoppingCart, Wallet, Store, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
  title: string;
  icon: React.ReactNode;
  path: string;
}

const mainLinks: SidebarItem[] = [{
  title: "Dashboard",
  icon: <LayoutDashboard size={20} />,
  path: "/"
}, {
  title: "Products",
  icon: <Package2 size={20} />,
  path: "/products"
}, {
  title: "Purchases",
  icon: <ShoppingCart size={20} />,
  path: "/purchases"
}, {
  title: "Vendors",
  icon: <Store size={20} />,
  path: "/vendors"
}, {
  title: "Tasks",
  icon: <ListTodo size={20} />,
  path: "/tasks"
}];

const communicationLinks: SidebarItem[] = [{
  title: "Email",
  icon: <Mail size={20} />,
  path: "/email"
}, {
  title: "Chat",
  icon: <MessageCircle size={20} />,
  path: "/chat"
}];

const organizationLinks: SidebarItem[] = [{
  title: "Contacts",
  icon: <Contact2 size={20} />,
  path: "/contacts"
}, {
  title: "Companies",
  icon: <Building2 size={20} />,
  path: "/companies"
}];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setCollapsed(!collapsed);

  return <div className={cn("flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && <h1 className="font-bold text-xl">Procure Hub CRM</h1>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent">
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <div className="overflow-y-auto flex-grow crm-scrollbar">
        <nav className="px-2 py-4">
          <div className="mb-6">
            {!collapsed && <p className="px-4 mb-2 text-xs uppercase text-sidebar-foreground/60">Procurement</p>}
            <ul>
              {mainLinks.map(item => <li key={item.path} className="mb-1">
                  <Link to={item.path} className={cn("flex items-center px-4 py-2.5 rounded-md transition-colors", location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50")}>
                    <span className="mr-3">{item.icon}</span>
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </li>)}
            </ul>
          </div>
          
          {!collapsed && <>
              <div className="mb-6">
                <p className="px-4 mb-2 text-xs uppercase text-sidebar-foreground/60">Communication</p>
                <ul>
                  {communicationLinks.map(item => <li key={item.path} className="mb-1">
                      <Link to={item.path} className={cn("flex items-center px-4 py-2.5 rounded-md transition-colors", location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50")}>
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </li>)}
                </ul>
              </div>
              
              <div className="mb-6">
                <p className="px-4 mb-2 text-xs uppercase text-sidebar-foreground/60">Organization</p>
                <ul>
                  {organizationLinks.map(item => <li key={item.path} className="mb-1">
                      <Link to={item.path} className={cn("flex items-center px-4 py-2.5 rounded-md transition-colors", location.pathname === item.path ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50")}>
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </li>)}
                </ul>
              </div>
            </>}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <Link to="/settings" className={cn("flex items-center px-4 py-2.5 rounded-md transition-colors hover:bg-sidebar-accent/50", location.pathname === "/settings" && "bg-sidebar-accent text-sidebar-accent-foreground")}>
          <span className="mr-3"><Settings size={20} /></span>
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </div>;
};

export default Sidebar;
