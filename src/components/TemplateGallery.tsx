import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter as FilterIcon } from "lucide-react";
import TemplateCard, { Template } from "./TemplateCard";

// Sample template data
const SAMPLE_TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Newsletter Organizer",
    description:
      "Automatically categorize and label all your newsletter subscriptions for easy management.",
    tags: ["newsletters", "organization", "productivity"],
    filters: 3,
    labels: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=500&q=80",
  },
  {
    id: "2",
    title: "Shopping Receipts",
    description:
      "Keep all your online shopping receipts in one place with smart filters and labels.",
    tags: ["shopping", "receipts", "finance"],
    filters: 2,
    labels: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=500&q=80",
  },
  {
    id: "3",
    title: "Work Communications",
    description:
      "Separate work emails from personal ones and organize them by project or department.",
    tags: ["work", "productivity", "organization"],
    filters: 5,
    labels: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=500&q=80",
  },
  {
    id: "4",
    title: "Social Media Alerts",
    description:
      "Group all social media notifications and alerts into a dedicated folder.",
    tags: ["social", "notifications", "organization"],
    filters: 4,
    labels: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80",
  },
];

interface TemplateGalleryProps {
  onApplyTemplate: (templateId: string) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onApplyTemplate,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter templates based on search query and active tab
  const filteredTemplates = SAMPLE_TEMPLATES.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && template.tags.includes(activeTab);
  });

  const handleApplyTemplate = (templateId: string) => {
    onApplyTemplate(templateId);
  };

  const handlePreviewTemplate = (templateId: string) => {
    // In a real implementation, this would show a preview modal
    console.log(`Preview template: ${templateId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onApply={handleApplyTemplate}
                onPreview={handlePreviewTemplate}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="productivity" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onApply={handleApplyTemplate}
                onPreview={handlePreviewTemplate}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="organization" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onApply={handleApplyTemplate}
                onPreview={handlePreviewTemplate}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="finance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onApply={handleApplyTemplate}
                onPreview={handlePreviewTemplate}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateGallery;
