import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Protocols() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Protocols</h1>
        <p className="text-muted-foreground">Standard operating procedures</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Safety Guidelines</CardTitle>
          <CardDescription>Follow these protocols during rescue missions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Always assess the scene for safety before approaching</li>
            <li>Contact emergency services if situation is beyond your capability</li>
            <li>Keep communication open with victims and team members</li>
            <li>Document all actions taken for reporting</li>
            <li>Follow up after mission completion</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}