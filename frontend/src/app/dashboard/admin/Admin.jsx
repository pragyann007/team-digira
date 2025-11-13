import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsSkeleton, TableSkeleton } from "@/components/LoadingSkeleton";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Users,
  Ambulance,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react";
const mockStats = {
  totalUsers: 24,
  activeRescuers: 20,
  pendingRequests: 23,
  completedToday: 5,
  responseRate: "98.5%",
};
const mockActivites = [
    {
        id: 1,
        user : "Hari Bahadur Khatri" ,
        action : "requested a rescue" , 
        time : " 10 mins ago" ,
        status : "pending" ,
        badge : "urgent case" ,
    },
    {
        id : 2,
        user: "Shiva Regmi" ,
        action: "Completed a rescue" ,
        time: " 30 mins ago" ,
        status : "completed" ,
        badge : "Serious injury" ,

    },
    {
    id: 3,
    user: "Avaya's NGO",
    action: "Rescuer joined platform",
    time: "12 min ago",
    status: "new",
    badge: "info",
  },
  {
    id: 4,
    user: "Divya Darsheel",
    action: "User joined platform",
    time: "18 min ago",
    status: "pending",
    badge: "warning",
  },

];
const mockRescuers =[
    {
    id: 1,
    name: "Shiva Regmi's NGOO",
    status: "online",
    location: "Lainchaur, Kathmandu",
  },
  {
    id: 2,
    name: "Abaya Shrestha's NGO",
    status: "on-rescue",
    location: "Sorhakhutte, Kathmandu",
  },
  {
    id: 3,
    name: "Pragyann Thapaliya's NGO",
    status: "offline",
    location: "ThapaThali, Kathmandu",
  },
];

export default function Admin() {
  const { user, logout } = useAuth();
  const auth = useSelector((state) => state.auth);
  const [stats, setStats] = useState(mockStats);
  const [activities, setActivities] = useState(mockActivities);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    toast.loading("Refreshing dashboard data...", {
      id: "refresh-admin",
    });

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
      toast.success("Dashboard refreshed successfully!", {
        id: "refresh-admin",
        duration: 3000,
      });
    }, 1500);
  };

  const handleCreateNew = () => {
    toast.info("Create new feature coming soon!", {
      description: "This will open a modal to create users/rescuers",
    });
  };

  const handleQuickAction = (action) => {
    toast.success(`${action} action completed`, {
      description: "This is a demo action",
    });
  };

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      description: "Redirecting to home page...",
    });
    setTimeout(() => logout(), 1000);
  };

  if (auth.isLoading) {
    return (
      <div className="space-y-6">
        <StatsSkeleton />
        <TableSkeleton rows={5} />
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "urgent":
        return "bg-red-500";
      case "success":
        return "bg-green-500";
      case "info":
        return "bg-blue-500";
      case "warning":
        return "bg-yellow-500";
      case "active":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">Welcome back, Admin!</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-blue-700">+19% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Active Rescuers
            </CardTitle>
            <Ambulance className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {stats.activeRescuers}
            </div>
            <p className="text-xs text-green-700">8 currently on rescues</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900">
              Pending Requests
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {stats.pendingRequests}
            </div>
            <p className="text-xs text-yellow-700">5 urgent, 2 high priority</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Response Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {stats.responseRate}
            </div>
            <p className="text-xs text-purple-700">Excellent performance!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/admin/analytics">View All</Link>
              </Button>
            </div>
            <CardDescription>
              Latest rescue requests and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-left">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-left">
                        {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground text-left">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${getStatusColor(
                        activity.status
                      )} px-2 py-1 text-xs`}
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common admin tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("Manage Users")}
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("Export Reports")}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Reports
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleQuickAction("View Analytics")}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Rescuers</CardTitle>
              <CardDescription>Currently available</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockRescuers.map((rescuer) => (
                <div
                  key={rescuer.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        rescuer.status === "online"
                          ? "bg-green-500"
                          : rescuer.status === "on-mission"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium text-left">
                      {rescuer.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground text-right">
                    {rescuer.location}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
