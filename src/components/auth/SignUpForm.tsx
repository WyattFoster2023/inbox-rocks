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
import { useToast } from "@/components/ui/use-toast";
import { getGmailAuthUrl } from "@/services/gmailService";

export default function SignUpForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGmailSignUp = () => {
    // Redirect to Gmail OAuth flow
    window.location.href = getGmailAuthUrl();
  };

  return (
    <AuthLayout>
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" /> Create an account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Sign up with your Gmail account to start decluttering your inbox
            </p>
            <div className="space-y-2">
              <Button
                onClick={handleGmailSignUp}
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
                  Privacy Information
                </span>
              </div>
            </div>
            <div className="text-xs text-center text-muted-foreground">
              <p>
                By signing up, you agree to our Terms of Service and Privacy
                Policy.
              </p>
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
            Already have an account?{" "}
            <Link to="/login" className="text-rock hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
