
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export const AuthForm = ({ onAuthSuccess }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentName, setParentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              parent_name: parentName,
            },
          },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
      onAuthSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-primary">
      <CardHeader>
        <CardTitle className="text-white">
          {isLogin ? "Sign In" : "Create Account"}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {isLogin 
            ? "Welcome back to Homework Helper" 
            : "Join Homework Helper to get started"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <Input
                type="text"
                placeholder="Parent/Guardian Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
                className="bg-black border-primary text-white placeholder:text-gray-400"
              />
            </div>
          )}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black border-primary text-white placeholder:text-gray-400"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-black border-primary text-white placeholder:text-gray-400"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-black hover:bg-primary/90"
          >
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
