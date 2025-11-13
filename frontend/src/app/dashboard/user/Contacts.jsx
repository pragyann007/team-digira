import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Contacts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Contacts</h1>
        <p className="text-muted-foreground">Important numbers for immediate help</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Emergency Hotlines</CardTitle>
          <CardDescription>Save these numbers for quick access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Police</p>
              <p className="text-sm text-muted-foreground">Emergency police services</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = 'tel:100'}>
              <Phone className="mr-2 h-4 w-4" />
              100
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Ambulance</p>
              <p className="text-sm text-muted-foreground">Medical emergency</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = 'tel:102'}>
              <Phone className="mr-2 h-4 w-4" />
              102
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Fire Department</p>
              <p className="text-sm text-muted-foreground">Fire emergency</p>
            </div>
            <Button variant="outline" onClick={() => window.location.href = 'tel:101'}>
              <Phone className="mr-2 h-4 w-4" />
              101
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}