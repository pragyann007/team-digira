import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function History() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Completed Requests</h1>
        <p className="text-muted-foreground">View your rescue history</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Request History</CardTitle>
          <CardDescription>All completed rescue requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cat Rescue - Gongabu</p>
                <p className="text-sm text-muted-foreground">Completed 2 days ago</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Death of Stray Dog - Paknajol</p>
                <p className="text-sm text-muted-foreground">Completed 3 days ago</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}