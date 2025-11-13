import {Card , CardContent , CardDescription,CardHeader , CardTitle } from "@/components/ui/card";
import {Button } from "@/component/ui/button";
export default function Rescuers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rescuer Management</h1>
        <p className="text-muted-foreground">Manage rescuer accounts and status</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Rescuers</CardTitle>
            <CardDescription>View and manage rescuer details</CardDescription>
          </div>
          <Button variant="outline">Verify Rescuer</Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Rescuer management interface will be implemented here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}