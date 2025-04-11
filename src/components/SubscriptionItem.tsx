import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, ExternalLink, Mail, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Subscription {
  id: string;
  name: string;
  email: string;
  lastReceived: Date;
  frequency: "daily" | "weekly" | "monthly" | "unknown";
  category?: string;
  logoUrl?: string;
  emailCount: number;
  isAligned?: boolean;
}

interface SubscriptionItemProps {
  subscription: Subscription;
  onToggleAlignment: (id: string, aligned: boolean) => void;
  onUnsubscribe: (id: string) => void;
  onKeep: (id: string) => void;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  subscription,
  onToggleAlignment,
  onUnsubscribe,
  onKeep,
}) => {
  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return "bg-red-100 text-red-800 border-red-200";
      case "weekly":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "monthly":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-rock-muted flex items-center justify-center">
            {subscription.logoUrl ? (
              <img
                src={subscription.logoUrl}
                alt={subscription.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Mail className="h-5 w-5 text-rock" />
            )}
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate">{subscription.name}</h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={getFrequencyColor(subscription.frequency)}
                >
                  {subscription.frequency}
                </Badge>
                {subscription.category && (
                  <Badge variant="outline">{subscription.category}</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-muted-foreground truncate">
                {subscription.email}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(subscription.lastReceived, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`align-${subscription.id}`}
                  checked={subscription.isAligned}
                  onCheckedChange={(checked) =>
                    onToggleAlignment(subscription.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={`align-${subscription.id}`}
                  className="text-sm cursor-pointer"
                >
                  Aligns with goals
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  onClick={() => onKeep(subscription.id)}
                >
                  Keep
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 px-3"
                  onClick={() => onUnsubscribe(subscription.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Unsubscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionItem;
