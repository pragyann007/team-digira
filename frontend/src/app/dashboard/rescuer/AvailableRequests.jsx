import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export default function AvailableRequests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Requests</h1>
        <p className="text-muted-foreground">Nearby requests you can help with</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>Requests waiting for rescuer assignment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Cat Rescue - Gongabu</p>
                  <p className="text-sm text-muted-foreground">2.3 km away</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-yellow-500 text-white">Medium</Badge>
                <Button size="sm">Accept</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Death of Stray Dog - Paknajol</p>
                  <p className="text-sm text-muted-foreground">1.8 km away</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-500 text-white">High</Badge>
                <Button size="sm">Accept</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}