
export type ContactStatus = 'lead' | 'customer' | 'churned' | 'prospect';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: ContactStatus;
  tags: string[];
  avatar?: string;
  lastContact?: string;
  createdAt: string;
}

export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
  contactName: string;
  company?: string;
  probability?: number;
  expectedCloseDate?: string;
  createdAt: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: string;
  contactId?: string;
  dealId?: string;
  createdAt: string;
}

export interface DashboardStats {
  newLeads: number;
  activeDeals: number;
  revenue: number;
  conversionRate: number;
  tasks: number;
}

export interface ActivityItem {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description?: string;
  createdAt: string;
  contactId?: string;
  contactName?: string;
  dealId?: string;
  dealTitle?: string;
  userId?: string;
  userName?: string;
}

export type ProductCategory = 'hardware' | 'software' | 'services' | 'office' | 'other';
export type ProductStatus = 'active' | 'discontinued' | 'pending';

export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  category: ProductCategory;
  status: ProductStatus;
  price: number;
  vendorId: string;
  vendorName: string;
  stockQuantity?: number;
  minStockLevel?: number;
  lastPurchaseDate?: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  orderNumber: string;
  vendorId: string;
  vendorName: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: PurchaseItem[];
  orderDate: string;
  expectedDeliveryDate?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  website?: string;
  paymentTerms?: string;
  rating?: number;
  tags: string[];
  createdAt: string;
}
