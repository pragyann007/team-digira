import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ActiveMissions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Missions</h1>
        <p className="text-muted-foreground">All your current rescue missions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current Missions</CardTitle>
          <CardDescription>Real-time mission status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Dog Rescue - Sorakhutte</p>
                <p className="text-sm text-muted-foreground">Victim Reporter: Rahul Kumar</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Accident of Cow - Samakhushi</p>
                <p className="text-sm text-muted-foreground">Victim Reporter: Geeta Sharma</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Accepted</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}