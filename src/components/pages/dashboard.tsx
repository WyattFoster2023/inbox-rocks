import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import { Mail, Sun, Moon, LogOut } from "lucide-react";
import TemplateGallery from "../TemplateGallery";
import SubscriptionScanner from "../SubscriptionScanner";
import GoalAlignment from "../GoalAlignment";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("templates");

  const handleApplyTemplate = (templateId: string) => {
    console.log(`Applying template: ${templateId}`);
    // In a real implementation, this would call the Gmail API to apply filters and labels
  };

  const handleUnsubscribe = (subscriptionId: string) => {
    console.log(`Unsubscribing from: ${subscriptionId}`);
    // In a real implementation, this would trigger the unsubscribe workflow
  };

  const handleGoalChange = (goals: any[]) => {
    console.log("Goals updated:", goals);
    // In a real implementation, this would update the user's goals in the database
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-rock" />
            <h1 className="text-xl font-bold">Inbox.rocks</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            Welcome
            {user?.user_metadata?.full_name
              ? `, ${user.user_metadata.full_name}`
              : ""}
            !
          </h2>
          <p className="text-muted-foreground">
            Let's declutter your inbox and take back control.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="templates">Template Gallery</TabsTrigger>
                <TabsTrigger value="subscriptions">
                  Subscription Scanner
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="space-y-4">
                <TemplateGallery onApplyTemplate={handleApplyTemplate} />
              </TabsContent>

              <TabsContent value="subscriptions" className="space-y-4">
                <SubscriptionScanner onUnsubscribe={handleUnsubscribe} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GoalAlignment onGoalChange={handleGoalChange} />

            {/* Stats Card */}
            <div className="rounded-xl border bg-card p-4 shadow">
              <h3 className="font-semibold mb-2">Inbox Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subscriptions Found
                  </span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unsubscribed</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Templates Applied
                  </span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Emails Organized
                  </span>
                  <span className="font-medium">1,254</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
