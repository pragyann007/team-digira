import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { MapPin, Loader2 } from "lucide-react";
import LocationMap from "@/components/LocationMap";
import axios from "axios";
import { path } from "../../serverPath";

export function RescuerSignupForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoDetectingLocation, setAutoDetectingLocation] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: { lat: null, long: null }
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setAutoDetectingLocation(true);
    toast.loading("Detecting your base location...", { id: "location-detect" });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setFormData(prev => ({
          ...prev,
          location: { lat: latitude, lng: longitude }
        }));

        toast.success("Location detected!", {
          id: "location-detect",
          description: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });

        setAutoDetectingLocation(false);
      },
      () => {
        toast.error("Failed to detect location. Allow permissions", { id: "location-detect" });
        setAutoDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Logging you in...");
  
    try {
      // Select API based on user type
      const endpoint =
        userType === "Rescuer"
          ? `${path}/api/auth/login-rescuer`
          : `${path}/api/auth/login`;
  
      const response = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );
  
      console.log("Login successful:", response.data);
  
      const userData = response.data?.user;
      if (!userData) throw new Error("Invalid server response — missing user data");
  
      toast.success("Login successful!", {
        id: loadingToast,
        description: "Redirecting to your dashboard...",
      });
  
      // Save to Redux
      dispatch(loginUser(userData));
  
      // Redirect
      navigate(`/dashboard/${userData.role?.toLowerCase() || userType.toLowerCase()}`);
  
    } catch (error) {
      console.error("Login failed:", error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Invalid credentials or server error!";
      toast.error(msg, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col gap-6" {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Join as Rescuer</CardTitle>
          <CardDescription>Become a verified rescuer to help those in need</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Banega Rescuer" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="rescuer@streetsathi.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+977 98765 43210" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters long.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label>Base Location (Auto-detect for accuracy)</Label>
              {autoDetectingLocation && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Detecting location...
                </div>
              )}
              {formData.location.lat && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Location Set</p>
                  <p className="text-xs text-blue-700">Lat: {formData.location.lat.toFixed(4)}, Lng: {formData.location.lng.toFixed(4)}</p>
                </div>
              )}
              <Button type="button" variant="outline" onClick={handleAutoDetectLocation} className="w-full" disabled={autoDetectingLocation}>
                <MapPin className="mr-2 h-4 w-4" />
                {formData.location.lat ? "Update Location" : "Detect My Base Location"}
              </Button>
              {formData.location.lat && <LocationMap lat={formData.location.lat} lng={formData.location.lng} address="Base Location" />}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || !formData.location.lat}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing Application..." : "Apply as Rescuer"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
