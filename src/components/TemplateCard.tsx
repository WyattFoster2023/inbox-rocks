import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Inbox, Tag } from "lucide-react";

export interface Template {
  id: string;
  title: string;
  description: string;
  tags: string[];
  filters: number;
  labels: number;
  imageUrl?: string;
}

interface TemplateCardProps {
  template: Template;
  onApply: (templateId: string) => void;
  onPreview: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onApply,
  onPreview,
}) => {
  return (
    <Card className="rock-card overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      {template.imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={template.imageUrl}
            alt={template.title}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{template.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-rock-muted text-rock-foreground text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Filter className="h-3 w-3" />
            <span>{template.filters} filters</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            <span>{template.labels} labels</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(template.id)}
          className="text-rock hover:text-rock-foreground hover:bg-rock"
        >
          Preview
        </Button>
        <Button
          size="sm"
          onClick={() => onApply(template.id)}
          className="rock-button"
        >
          <Inbox className="mr-1 h-3 w-3" /> Apply
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
