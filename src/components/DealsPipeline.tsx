
import { useState } from "react";
import { deals, stageColors } from "@/data/mockData";
import { Deal, DealStage } from "@/types/crm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// All possible deal stages in the correct order
const pipelineStages: DealStage[] = [
  "lead",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
  "closed-lost"
];

// Stage labels for display
const stageLabels: Record<DealStage, string> = {
  "lead": "Lead",
  "qualified": "Qualified",
  "proposal": "Proposal",
  "negotiation": "Negotiation",
  "closed-won": "Closed Won",
  "closed-lost": "Closed Lost"
};

const DealsPipeline = () => {
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  
  // Group deals by stage
  const dealsByStage = pipelineStages.reduce<Record<DealStage, Deal[]>>(
    (acc, stage) => {
      acc[stage] = deals.filter(deal => deal.stage === stage);
      return acc;
    },
    {
      lead: [],
      qualified: [],
      proposal: [],
      negotiation: [],
      "closed-won": [],
      "closed-lost": [],
    }
  );
  
  // Calculate total value by stage
  const totalValueByStage = pipelineStages.reduce<Record<DealStage, number>>(
    (acc, stage) => {
      acc[stage] = dealsByStage[stage].reduce((sum, deal) => sum + deal.value, 0);
      return acc;
    },
    {
      lead: 0,
      qualified: 0,
      proposal: 0,
      negotiation: 0,
      "closed-won": 0,
      "closed-lost": 0,
    }
  );
  
  // Handlers for drag and drop
  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (stage: DealStage) => {
    // In a real app, this would update the backend
    console.log(`Moved deal ${draggedDeal?.id} to stage: ${stage}`);
    setDraggedDeal(null);
  };
  
  return (
    <Card className="bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Deals Pipeline</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track your sales pipeline
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> New Deal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-4 overflow-x-auto pb-6">
          {pipelineStages.map((stage) => (
            <div 
              key={stage}
              className={cn(
                "min-w-[240px] bg-card rounded-lg shadow-sm border h-full flex flex-col",
                (stage === "closed-won" || stage === "closed-lost") && "opacity-90"
              )}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(stage)}
            >
              <div className="p-3 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{stageLabels[stage]}</h3>
                  <p className="text-xs text-muted-foreground">
                    {dealsByStage[stage].length} deals · ${totalValueByStage[stage].toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline" className={cn("font-normal", stageColors[stage])}>
                  {dealsByStage[stage].length}
                </Badge>
              </div>
              <div className="flex-1 p-2 space-y-2 overflow-y-auto crm-scrollbar max-h-[500px]">
                {dealsByStage[stage].map((deal) => (
                  <DealCard 
                    key={deal.id} 
                    deal={deal} 
                    onDragStart={() => handleDragStart(deal)}
                  />
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground text-xs border border-dashed h-auto py-2"
                >
                  <Plus className="h-3 w-3 mr-1" /> Add Deal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DealCard = ({ deal, onDragStart }: { deal: Deal; onDragStart: () => void }) => {
  return (
    <div 
      className="p-3 bg-background rounded-md border shadow-sm cursor-grab hover:shadow-md transition-shadow"
      draggable
      onDragStart={onDragStart}
    >
      <h4 className="font-medium text-sm truncate" title={deal.title}>{deal.title}</h4>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-muted-foreground truncate" title={deal.company || ""}>
          {deal.company || "No company"}
        </span>
        <span className="text-sm font-medium">${deal.value.toLocaleString()}</span>
      </div>
      <div className="mt-2 flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-medium">
            {deal.contactName.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-xs ml-1 text-muted-foreground">{deal.probability || 0}%</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {deal.expectedCloseDate ? 
            new Date(deal.expectedCloseDate).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            }) : "No date"}
        </div>
      </div>
    </div>
  );
};

export default DealsPipeline;
