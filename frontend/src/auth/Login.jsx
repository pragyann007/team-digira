import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await dispatch(loginUser({ email, password, userType })).unwrap();
      navigate(`/dashboard/${result.user.role}`);
      
    } catch (error) {
      console.error("Login failed:", error);
      alert(error || "Login failed. Try: admin@street.com / projecthobhai123");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <span className="text-xs font-bold">SS</span>
          </div>
          Street साथी
        </a>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Select your Account type and login to your account
            </CardDescription>
            <ToggleGroup 
              type="single" 
              variant="outline" 
              className="block ml-auto mr-auto my-3"
              value={userType}
              onValueChange={(value) => value && setUserType(value)}
            >
              <ToggleGroupItem value="User" aria-label="User Login">
                <p>User</p>
              </ToggleGroupItem>
              <ToggleGroupItem value="Rescuer" aria-label="Rescuer Login">
                <p>Rescuer</p>
              </ToggleGroupItem>
            </ToggleGroup>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </Field>
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </Field>
                <Field>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Signing in..." : "Login"}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    Don't have an account?{" "}
                    <a href={`/register${userType}`} className="text-primary hover:underline">
                      Sign up as {userType}
                    </a>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
}