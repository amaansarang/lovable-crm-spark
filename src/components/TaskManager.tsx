
import { useState } from "react";
import { tasks, priorityColors, statusColors } from "@/data/mockData";
import { Task, TaskPriority, TaskStatus } from "@/types/crm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const taskStatusOptions: TaskStatus[] = ["todo", "in-progress", "completed"];

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState<TaskStatus>("todo");
  
  const filteredTasks = tasks.filter(task => task.status === activeTab);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Tasks</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track your tasks
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="todo" value={activeTab} onValueChange={(value) => setActiveTab(value as TaskStatus)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="todo" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> To Do <Badge variant="outline" className="ml-1 opacity-70">
                {tasks.filter(task => task.status === "todo").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> In Progress <Badge variant="outline" className="ml-1 opacity-70">
                {tasks.filter(task => task.status === "in-progress").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Completed <Badge variant="outline" className="ml-1 opacity-70">
                {tasks.filter(task => task.status === "completed").length}
              </Badge>
            </TabsTrigger>
          </TabsList>
          
          {taskStatusOptions.map((status) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <Clock className="h-8 w-8 mb-2 opacity-50" />
                    <p>No {status.replace('-', ' ')} tasks</p>
                    <Button className="mt-4" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add a task
                    </Button>
                  </div>
                ) : (
                  filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "No due date";
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Status badge styles based on task status
  const statusBadgeVariant: Record<TaskStatus, "default" | "outline" | "secondary"> = {
    "todo": "outline",
    "in-progress": "secondary",
    "completed": "default"
  };
  
  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium mb-1">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex flex-wrap items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Badge
            variant={statusBadgeVariant[task.status]}
            className={cn("font-normal", statusColors[task.status])}
          >
            {task.status.replace('-', ' ')}
          </Badge>
          <Badge
            variant="outline"
            className={cn("font-normal", priorityColors[task.priority])}
          >
            {task.priority}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {task.dueDate ? formatDate(task.dueDate) : "No due date"}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
