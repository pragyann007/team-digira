import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rescuer Profile</h1>
        <p className="text-muted-foreground">Manage your rescuer account</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update you rescuer details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Rescuer" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialty">Expertee</Label>
            <Input id="specialty" defaultValue="Medical Aid, Food Distribution" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">initial Location</Label>
            <Input id="location" defaultValue="South Delhi" />
          </div>
          <Button>Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}