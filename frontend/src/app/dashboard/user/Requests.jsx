import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Requests() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Requests</h1>
        <p className="text-muted-foreground">Track your pending rescue requests</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current Active Requests</CardTitle>
          <CardDescription>All requests awaiting response</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Medical Aid - Connaught Place</p>
                <p className="text-sm text-muted-foreground">Submitted 2 hours ago</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Food & Shelter - Karol Bagh</p>
                <p className="text-sm text-muted-foreground">Submitted 5 hours ago</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}