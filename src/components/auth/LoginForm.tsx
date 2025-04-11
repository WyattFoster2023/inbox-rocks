import { useEffect } from "react";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Mail } from "lucide-react";
import { getGmailAuthUrl } from "@/services/gmailService";

export default function LoginForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGmailLogin = () => {
    // Redirect to Gmail OAuth flow
    window.location.href = getGmailAuthUrl();
  };

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" /> Sign in with Gmail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Connect your Gmail account to start decluttering your inbox
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleGmailLogin}
                className="w-full rock-button"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" /> Continue with Gmail
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              <p>
                We only request the permissions needed to help you declutter
                your inbox.
              </p>
              <p>Your data is never shared with third parties.</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-slate-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-rock hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
