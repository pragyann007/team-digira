import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
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
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Navigation,
  User,
  Phone,
  Loader2,
  RefreshCw,
  Eye,
  Play,
  Pause,
  Flag,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3)"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const mockStats = {
  activeMissions: 2,
  completedToday: 7,
  avgResponseTime: "12 min",
  successRate: "96.3%",
};

const mockActiveMissions = [
  {
    id: "5686894",
    type: "Dog Rescue",
    location: "Sorhakhutte, Kathmandu",
    status: "in-progress",
    victim: "Rahul Thapa",
    phone: "+977 98***1234",
    priority: "urgent",
    startedAt: "15 min ago",
    progress: 60,
  },
  {
    id: "6546465165",
    type: "Cat Rescue",
    location: "Baneshwor, Kathmandu",
    status: "accepted",
    victim: "Geeta Sharma",
    phone: "+977 99***5678",
    priority: "high",
    startedAt: "Just now",
    progress: 10,
  },
];

const mockAvailableRequests = [
  {
    id: "3213164656",
    type: "Death of Animal",
    location: "Sano Thimi, Bhaktapur",
    distance: "2.3 km",
    priority: "medium",
    requestedAt: "5 min ago",
    victim: "Amrit Sharma Gautam",
  },
  {
    id: "154542555545",
    type: "Accident of Dog",
    location: "Thapatali, Kathmandu",
    distance: "1.8 km",
    priority: "high",
    requestedAt: "8 min ago",
    victim: "Sneha Pandey",
  },
  {
    id: "9876543210",
    type: "Shelter required for Animal",
    location: "Maitidevi, Kathmandu",
    distance: "3.5 km",
    priority: "urgent",
    requestedAt: "12 min ago",
    victim: "Vikram Joshi",
  },
];

const mapData = {
  rescuerLocation: [27.7172, 85.324], // Kathmandu
  requests: [
    {
      id: "3213164656",
      type: "Death of Animal",
      victim: "Amrit Sharma Gautam",
      location: "Sano Thimi, Bhaktapur",
      priority: "medium",
      position: [27.6794, 85.3807],
    },
    {
      id: "154542555545",
      type: "Accident of Dog",
      victim: "Sneha Pandey",
      location: "Thapatali, Kathmandu",
      priority: "high",
      position: [27.6945, 85.3186],
    },
    {
      id: "9876543210",
      type: "Shelter required for Animal",
      victim: "Vikram Joshi",
      location: "Maitidevi, Kathmandu",
      priority: "urgent",
      position: [27.7083, 85.3222],
    },
  ],
};

export default function Rescuer() {
  const { user, logout } = useAuth();
  const auth = useSelector((state) => state.auth);
  const [activeMissions, setActiveMissions] = useState(mockActiveMissions);
  const [availableRequests, setAvailableRequests] = useState(
    mockAvailableRequests
  );
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = (missionId, newStatus) => {
    const missionName =
      activeMissions.find((m) => m.id === missionId)?.type || "Mission";

    const loadingToast = toast.loading(`Updating ${missionName} status...`);

    setActiveMissions((missions) =>
      missions.map((mission) =>
        mission.id === missionId
          ? {
              ...mission,
              status: newStatus,
              progress: newStatus === "completed" ? 100 : mission.progress,
            }
          : mission
      )
    );

    setTimeout(() => {
      toast.success("Mission status updated!", {
        id: loadingToast,
        description: `${missionName} is now ${newStatus}`,
        duration: 3000,
      });
    }, 1000);
  };

  const handleAcceptMission = (request) => {
    setLoading(true);
    const loadingToast = toast.loading(`Accepting ${request.type} mission...`);

    setTimeout(() => {
      const newMission = {
        id: request.id,
        type: request.type,
        location: request.location,
        status: "accepted",
        victim: request.victim,
        phone: "+91 95****0000",
        priority: request.priority,
        startedAt: "Just now",
        progress: 0,
      };

      setActiveMissions([newMission, ...activeMissions]);
      setAvailableRequests(
        availableRequests.filter((r) => r.id !== request.id)
      );
      setLoading(false);

      toast.success("Mission accepted!", {
        id: loadingToast,
        description: `You're now assigned to ${request.type}`,
        duration: 4000,
        action: {
          label: "View Mission",
          onClick: () => console.log("View mission", request.id),
        },
      });
    }, 1500);
  };

  const handleQuickAction = (action) => {
    toast.info(`${action} feature`, {
      description: "This feature is being developed",
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
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Missions</TabsTrigger>
            <TabsTrigger value="available">Available Requests</TabsTrigger>
          </TabsList>
          <TableSkeleton rows={3} />
        </Tabs>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Rescuer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Track your active missions and help those
            in need.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            Emergency
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              Active Missions
            </CardTitle>
            <Navigation className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {mockStats.activeMissions}
            </div>
            <p className="text-xs text-blue-700">Currently helping</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900">
              Completed Today
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {mockStats.completedToday}
            </div>
            <p className="text-xs text-green-700">Great job!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {mockStats.avgResponseTime}
            </div>
            <p className="text-xs text-purple-700">Faster than average</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900">
              Success Rate
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {mockStats.successRate}
            </div>
            <p className="text-xs text-orange-700">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Active Missions & Available Requests */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="active">
            Active Missions ({activeMissions.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            Available Requests ({availableRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Missions Tab */}
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Active Missions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/rescuer/active">View All</Link>
                </Button>
              </div>
              <CardDescription>
                Track and update mission progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mission ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Victim</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeMissions.map((mission) => (
                    <TableRow key={mission.id}>
                      <TableCell className="font-mono text-sm font-medium">
                        {mission.id}
                      </TableCell>
                      <TableCell>{mission.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {mission.victim
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {mission.victim}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {mission.phone}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {mission.location}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {mission.startedAt}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            mission.status
                          )} px-2 py-1 text-xs`}
                        >
                          {mission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Progress
                          value={mission.progress}
                          className="h-2 w-20"
                        />
                        <span className="text-xs text-muted-foreground">
                          {mission.progress}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={mission.status}
                          onValueChange={(value) =>
                            handleUpdateStatus(mission.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                            <SelectItem value="completed">Complete</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="available">
          <Card>
            <CardHeader>
              <CardTitle>Available Help Requests</CardTitle>
              <CardDescription>
                Accept missions near your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Victim</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {availableRequests.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center text-muted-foreground py-8"
                      >
                        No available requests in your area right now
                      </TableCell>
                    </TableRow>
                  ) : (
                    availableRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-mono text-sm font-medium">
                          {request.id}
                        </TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {request.victim
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {request.victim}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {request.location}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {request.distance}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getPriorityColor(
                              request.priority
                            )} text-white px-2 py-1 text-xs`}
                          >
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {request.requestedAt}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptMission(request)}
                            disabled={loading}
                          >
                            {loading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Play className="h-4 w-4 mr-2" />
                            )}
                            {loading ? "Accepting..." : "Accept"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Live Map View</CardTitle>
          <CardDescription>Your location and nearby requests</CardDescription>
        </CardHeader>
        <CardContent>
          <MapContainer
            center={mapData.rescuerLocation}
            zoom={13}
            className="h-64 sm:h-80 w-full rounded-lg z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Rescuer location */}
            <Circle
              center={mapData.rescuerLocation}
              radius={100}
              pathOptions={{
                color: "#3b82f6",
                fillColor: "#3b82f6",
                fillOpacity: 0.2,
              }}
            />
            <Marker
              position={mapData.rescuerLocation}
              icon={getCustomIcon("#3b82f6")}
            >
              <Popup>
                <div className="text-sm">
                  <strong>You (Rescuer)</strong>
                  <br />
                  Current Location
                  <br />
                  <small>Kathmandu</small>
                </div>
              </Popup>
            </Marker>

            {/* Request markers */}
            {mapData.requests.map((request) => (
              <Marker
                key={request.id}
                position={request.position}
                icon={getCustomIcon(
                  request.priority === "urgent"
                    ? "#ef4444"
                    : request.priority === "high"
                    ? "#f97316"
                    : "#eab308"
                )}
              >
                <Popup>
                  <div className="text-sm">
                    <strong>{request.type}</strong>
                    <br />
                    {request.victim}
                    <br />
                    <small>{request.location}</small>
                    <br />
                    <Badge
                      className={`${getPriorityColor(
                        request.priority
                      )} text-white mt-1 text-xs`}
                    >
                      {request.priority}
                    </Badge>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>You (Rescuer)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Urgent Request</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Emergency tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleQuickAction("Call Emergency Services")}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Emergency Services
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleQuickAction("Report Issue")}
          >
            <Flag className="mr-2 h-4 w-4" />
            Report Issue
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
    </div>
  );
}
