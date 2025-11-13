import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Chat() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Chat</h1>
        <p className="text-muted-foreground">Communicate with other rescuers</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Rescuer Team Chat</CardTitle>
          <CardDescription>Real-time communication with your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Chat interface will be integrated here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}