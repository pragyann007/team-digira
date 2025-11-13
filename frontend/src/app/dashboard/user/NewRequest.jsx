import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
export default function NewRequest() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Request</h1>
        <p className="text-muted-foreground">Get help from our rescue network</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Fill in your request information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Request Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="medical">Medical Aid</SelectItem>
                <SelectItem value="food">Food & Shelter</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Your Location</Label>
            <Input placeholder="Enter your current location" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe your situation in detail..." rows={4} />
          </div>
          <Button className="w-full">Submit Request</Button>
        </CardContent>
      </Card>
    </div>
  );
}