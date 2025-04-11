import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Target, Briefcase, Heart, Brain, Sparkles, Plus } from "lucide-react";

export interface Goal {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  category: "personal" | "professional" | "health" | "learning" | "other";
}

interface GoalAlignmentProps {
  onGoalChange: (goals: Goal[]) => void;
}

const GoalAlignment: React.FC<GoalAlignmentProps> = ({ onGoalChange }) => {
  // Sample goals
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Career Growth",
      description: "Stay updated on industry trends and opportunities",
      icon: <Briefcase className="h-5 w-5" />,
      active: true,
      category: "professional",
    },
    {
      id: "2",
      name: "Personal Development",
      description: "Improve skills and knowledge in areas of interest",
      icon: <Sparkles className="h-5 w-5" />,
      active: true,
      category: "personal",
    },
    {
      id: "3",
      name: "Health & Wellness",
      description: "Maintain physical and mental wellbeing",
      icon: <Heart className="h-5 w-5" />,
      active: false,
      category: "health",
    },
    {
      id: "4",
      name: "Continuous Learning",
      description: "Learn new skills and stay curious",
      icon: <Brain className="h-5 w-5" />,
      active: true,
      category: "learning",
    },
  ]);

  const handleToggleGoal = (id: string) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, active: !goal.active } : goal,
    );
    setGoals(updatedGoals);
    onGoalChange(updatedGoals);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "professional":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "personal":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "health":
        return "bg-green-100 text-green-800 border-green-200";
      case "learning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="rock-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-rock" /> Goal Alignment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Define your goals to help identify which subscriptions are valuable to
          you.
        </p>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${goal.active ? "bg-rock/10 text-rock" : "bg-muted text-muted-foreground"}`}
                >
                  {goal.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{goal.name}</h3>
                    <Badge
                      variant="outline"
                      className={getCategoryColor(goal.category)}
                    >
                      {goal.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id={`goal-${goal.id}`}
                  checked={goal.active}
                  onCheckedChange={() => handleToggleGoal(goal.id)}
                  className={goal.active ? "bg-rock" : ""}
                />
                <Label htmlFor={`goal-${goal.id}`} className="sr-only">
                  {goal.name}
                </Label>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full mt-2 border-dashed">
            <Plus className="h-4 w-4 mr-2" /> Add Custom Goal
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalAlignment;
