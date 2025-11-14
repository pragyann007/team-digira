import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: { lat: null, lng: null },
    verified: false
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
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

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          setFormData(prev => ({
            ...prev,
            location: { lat: latitude, lng: longitude }
          }));

          toast.success("Location detected!", {
            id: "location-detect",
            description: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        } catch (error) {
          toast.error("Failed to get location address", { id: "location-detect" });
        } finally {
          setAutoDetectingLocation(false);
        }
      },
      (error) => {
        toast.error("Failed to detect location", {
          id: "location-detect",
          description: "Please allow location permissions",
        });
        setAutoDetectingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!formData.location.lat || !formData.location.lng) {
      toast.error("Please detect your base location");
      setIsLoading(false);
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating rescuer account...");

    try {
      const response = await axios.post(
        `${path}/api/auth/register-rescuer`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          lat: formData.location.lat,
          lang: formData.location.lng // note backend expects 'lang'
        },
        { withCredentials: true }
      );

      console.log("Registration success:", response.data);
      toast.success(response.data.message, { id: loadingToast });

      setTimeout(() => navigate("/login"), 2500);
    } catch (error) {
      console.error("Registration error:", error);
      const msg = error.response?.data?.message || "Failed to create rescuer account!";
      toast.error(msg, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6" {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Join as Rescuer</CardTitle>
          <CardDescription>
            Become a verified rescuer to help those in need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Banega Rescuer" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="rescuer@streetsathi.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+977 98765 43210" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters long.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
            </div>

            {/* Location Detection */}
            <div className="space-y-2">
              <Label>Base Location (Auto-detect for accuracy)</Label>
              {autoDetectingLocation && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Detecting location...
                </div>
              )}
              {formData.location.lat && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Location Set</p>
                  <p className="text-xs text-blue-700">
                    Lat: {formData.location.lat.toFixed(4)}, Lng: {formData.location.lng.toFixed(4)}
                  </p>
                </div>
              )}
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAutoDetectLocation}
                className="w-full"
                disabled={autoDetectingLocation}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {formData.location.lat ? "Update Location" : "Detect My Base Location"}
              </Button>
              
              {formData.location.lat && (
                <LocationMap 
                  lat={formData.location.lat} 
                  lng={formData.location.lng} 
                  address="Base Location"
                />
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !formData.location.lat}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing Application..." : "Apply as Rescuer"}
            </Button>
            
            <p className="text-center text-sm text-muted-foreground">
              Already a member? <a href="/login" className="text-primary hover:underline">Sign in</a>
            </p>
          </form>
        </CardContent>
      </Card>
      
      <div className="px-6 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our <a href="#" className="hover:underline">Terms of Service</a>{" "}
        and <a href="#" className="hover:underline">Privacy Policy</a>.
      </div>
    </div>
  );
}
