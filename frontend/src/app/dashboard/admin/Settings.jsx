import {Card , CardContent , CardDescription ,CardHeader, CardTitle}from  "@/components/ui/button";
import {Button}from "@/components/ui/label";
import {Label}from  "@/components/ui/input";
import {Input}from  "@/components/ui/switch";
import { Switch } from "@/components/ui/switch";


export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure platform settings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
          <CardDescription>Manage admin settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input id="siteName" defaultValue="Street साथी" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="maintenance">Maintenance Mode</Label>
            <Switch id="maintenance" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}