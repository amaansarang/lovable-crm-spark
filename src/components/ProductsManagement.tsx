
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Package2, 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  CircleX 
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductCategory, ProductStatus } from "@/types/crm";
import { supabase } from "@/integrations/supabase/client";

// Product form schema
const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
  category: z.enum(["hardware", "software", "services", "office", "other"]),
  status: z.enum(["active", "discontinued", "pending"]),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  vendorId: z.string().min(1, "Vendor is required"),
  vendorName: z.string().min(1, "Vendor name is required"),
  stockQuantity: z.coerce.number().optional(),
  minStockLevel: z.coerce.number().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

const initialProducts: Product[] = [
  {
    id: "1",
    name: "ThinkPad X1 Carbon",
    sku: "TP-X1C-001",
    description: "14-inch professional laptop",
    category: "hardware",
    status: "active",
    price: 1499.99,
    vendorId: "v1",
    vendorName: "Lenovo",
    stockQuantity: 15,
    minStockLevel: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    name: "Microsoft Office 365",
    sku: "MS-O365-002",
    description: "Productivity software suite",
    category: "software",
    status: "active",
    price: 99.99,
    vendorId: "v2",
    vendorName: "Microsoft",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "IT Support Service",
    sku: "IT-SUP-003",
    description: "Annual IT support contract",
    category: "services",
    status: "active",
    price: 2500,
    vendorId: "v3",
    vendorName: "TechSupport Inc.",
    createdAt: new Date().toISOString()
  }
];

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      category: "hardware",
      status: "active",
      price: 0,
      vendorId: "",
      vendorName: "",
      stockQuantity: 0,
      minStockLevel: 0,
    }
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        name: editingProduct.name,
        sku: editingProduct.sku,
        description: editingProduct.description || "",
        category: editingProduct.category,
        status: editingProduct.status,
        price: editingProduct.price,
        vendorId: editingProduct.vendorId,
        vendorName: editingProduct.vendorName,
        stockQuantity: editingProduct.stockQuantity || 0,
        minStockLevel: editingProduct.minStockLevel || 0,
      });
    } else {
      form.reset({
        name: "",
        sku: "",
        description: "",
        category: "hardware",
        status: "active",
        price: 0,
        vendorId: "",
        vendorName: "",
        stockQuantity: 0,
        minStockLevel: 0,
      });
    }
  }, [editingProduct, form]);

  // Load products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // If there's an error fetching from Supabase, use the initial data
      setProducts(initialProducts);
      toast({
        title: "Failed to load products",
        description: "Using sample data instead",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProduct = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      
      const newProduct: Omit<Product, 'id' | 'createdAt'> = {
        ...data
      };
      
      // Try to add to Supabase
      const { data: insertedData, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();
      
      if (error) {
        throw error;
      }
      
      // If successful, update local state
      if (insertedData && insertedData.length > 0) {
        setProducts([...products, insertedData[0]]);
        toast({
          title: "Product added",
          description: `${data.name} has been added successfully`
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      
      // Fallback to local state update if Supabase fails
      const newProduct: Product = {
        ...data,
        id: `local-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      
      setProducts([...products, newProduct]);
      toast({
        title: "Product added",
        description: `${data.name} has been added to local storage`
      });
    } finally {
      setLoading(false);
      setIsAddDialogOpen(false);
      form.reset();
    }
  };

  const handleEditProduct = async (data: ProductFormValues) => {
    if (!editingProduct) return;
    
    try {
      setLoading(true);
      
      // Try to update in Supabase
      const { error } = await supabase
        .from('products')
        .update(data)
        .eq('id', editingProduct.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...data } : product
      );
      
      setProducts(updatedProducts);
      toast({
        title: "Product updated",
        description: `${data.name} has been updated successfully`
      });
    } catch (error) {
      console.error('Error updating product:', error);
      
      // Update local state anyway as fallback
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? { ...product, ...data } : product
      );
      
      setProducts(updatedProducts);
      toast({
        title: "Product updated",
        description: `${data.name} has been updated in local storage`
      });
    } finally {
      setLoading(false);
      setEditingProduct(null);
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setLoading(true);
      
      // Try to delete from Supabase
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully"
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      
      // Update local state anyway as fallback
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      
      toast({
        title: "Product deleted",
        description: "The product has been removed from local storage"
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: ProductFormValues) => {
    if (editingProduct) {
      handleEditProduct(data);
    } else {
      handleAddProduct(data);
    }
  };

  const getCategoryLabel = (category: ProductCategory) => {
    const labels: Record<ProductCategory, string> = {
      hardware: "Hardware",
      software: "Software",
      services: "Services",
      office: "Office",
      other: "Other"
    };
    return labels[category];
  };

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>Active</span>
          </div>
        );
      case "discontinued":
        return (
          <div className="flex items-center gap-1 text-red-600">
            <CircleX className="h-4 w-4" />
            <span>Discontinued</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1 text-amber-600">
            <Package2 className="h-4 w-4" />
            <span>Pending</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Products Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingProduct(null);
              form.reset();
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
              <DialogDescription>
                {editingProduct 
                  ? 'Update product details in the system.' 
                  : 'Fill in the product details to add it to the inventory.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU-123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hardware">Hardware</SelectItem>
                            <SelectItem value="software">Software</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="discontinued">Discontinued</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            step="0.01" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="stockQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="minStockLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Min Stock Level</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vendorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Vendor ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="vendorName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Vendor name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Product description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products by name, SKU, category or vendor..."
          className="w-full md:max-w-sm"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableCaption>A list of all products in the inventory.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{getCategoryLabel(product.category)}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stockQuantity ?? "N/A"}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>{product.vendorName}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditingProduct(product);
                            setIsAddDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    {loading ? (
                      <p>Loading products...</p>
                    ) : searchTerm ? (
                      <p>No products found matching your search.</p>
                    ) : (
                      <p>No products available. Add your first product using the button above.</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsManagement;
