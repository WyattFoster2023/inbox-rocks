import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type GmailAuthData = {
  email: string;
  gmailId: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiry: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGmail: (data: GmailAuthData) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (signed in, signed out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signInWithGmail = async (data: GmailAuthData) => {
    try {
      // Check if user exists with this Gmail ID
      const { data: existingUsers, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("gmail_id", data.gmailId)
        .limit(1);

      if (queryError) throw queryError;

      if (existingUsers && existingUsers.length > 0) {
        // User exists, sign in
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.gmailId, // Use Gmail ID as password for existing users
        });
        if (error) throw error;
      } else {
        // New user, sign up
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.gmailId, // Use Gmail ID as password
          options: {
            data: {
              full_name: data.fullName,
              gmail_id: data.gmailId,
              access_token: data.accessToken,
              refresh_token: data.refreshToken,
              token_expiry: data.tokenExpiry,
            },
          },
        });
        if (error) throw error;

        // Create entry in public.users table
        if (authData.user) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              id: authData.user.id,
              email: data.email,
              full_name: data.fullName,
              gmail_id: data.gmailId,
            },
          ]);
          if (insertError) throw insertError;
        }
      }

      // Update tokens in user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
          token_expiry: data.tokenExpiry,
        },
      });
      if (updateError) throw updateError;
    } catch (error) {
      console.error("Error in signInWithGmail:", error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signInWithGmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
