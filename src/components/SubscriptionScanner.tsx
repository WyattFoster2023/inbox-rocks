import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, RefreshCw, Filter as FilterIcon } from "lucide-react";
import SubscriptionItem, { Subscription } from "./SubscriptionItem";

// Sample subscription data
const SAMPLE_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    name: "Medium Daily Digest",
    email: "noreply@medium.com",
    lastReceived: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    frequency: "daily",
    category: "Content",
    logoUrl:
      "https://cdn-static-1.medium.com/_/fp/icons/Medium-Avatar-500x500.svg",
    emailCount: 45,
    isAligned: true,
  },
  {
    id: "2",
    name: "LinkedIn Notifications",
    email: "messages-noreply@linkedin.com",
    lastReceived: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    frequency: "daily",
    category: "Social",
    logoUrl:
      "https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg",
    emailCount: 67,
    isAligned: false,
  },
  {
    id: "3",
    name: "Spotify",
    email: "no-reply@spotify.com",
    lastReceived: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    frequency: "weekly",
    category: "Entertainment",
    logoUrl:
      "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    emailCount: 12,
    isAligned: true,
  },
  {
    id: "4",
    name: "Amazon Order Updates",
    email: "auto-confirm@amazon.com",
    lastReceived: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    frequency: "weekly",
    category: "Shopping",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
    emailCount: 34,
    isAligned: true,
  },
  {
    id: "5",
    name: "New York Times",
    email: "nytdirect@nytimes.com",
    lastReceived: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    frequency: "daily",
    category: "News",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/The_New_York_Times_logo.png",
    emailCount: 89,
    isAligned: false,
  },
];

interface SubscriptionScannerProps {
  onUnsubscribe: (subscriptionId: string) => void;
}

const SubscriptionScanner: React.FC<SubscriptionScannerProps> = ({
  onUnsubscribe,
}) => {
  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(SAMPLE_SUBSCRIPTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Filter subscriptions based on search query and active tab
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subscription.category
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ??
        false);

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "aligned") return matchesSearch && subscription.isAligned;
    if (activeTab === "unaligned")
      return matchesSearch && !subscription.isAligned;
    if (activeTab === "daily")
      return matchesSearch && subscription.frequency === "daily";
    if (activeTab === "weekly")
      return matchesSearch && subscription.frequency === "weekly";
    if (activeTab === "monthly")
      return matchesSearch && subscription.frequency === "monthly";

    return matchesSearch;
  });

  const handleToggleAlignment = (id: string, aligned: boolean) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, isAligned: aligned } : sub,
      ),
    );
  };

  const handleUnsubscribe = (id: string) => {
    // In a real implementation, this would trigger the unsubscribe workflow
    onUnsubscribe(id);
    // Remove from the list
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const handleKeep = (id: string) => {
    // Mark as explicitly kept
    console.log(`Keeping subscription: ${id}`);
  };

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      {isScanning ? (
        <div className="space-y-4 p-6 border rounded-lg bg-rock-muted/20">
          <h3 className="font-medium">Scanning your inbox...</h3>
          <Progress value={scanProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Analyzing email patterns and identifying potential subscriptions.
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <FilterIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleScan} className="ml-4 rock-button">
            <RefreshCw className="mr-2 h-4 w-4" /> Scan Inbox
          </Button>
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="aligned">Aligned</TabsTrigger>
          <TabsTrigger value="unaligned">Unaligned</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-4">
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions.map((subscription) => (
                <SubscriptionItem
                  key={subscription.id}
                  subscription={subscription}
                  onToggleAlignment={handleToggleAlignment}
                  onUnsubscribe={handleUnsubscribe}
                  onKeep={handleKeep}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No subscriptions found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionScanner;
