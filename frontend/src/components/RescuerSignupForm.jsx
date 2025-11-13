import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Upload, MapPin, Loader2 } from "lucide-react";
import LocationMap from "@/components/LocationMap";

export function RescuerSignupForm({ className, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoDetectingLocation, setAutoDetectingLocation] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    documentUrl: "",
    location: { lat: null, lng: null },
    verified: false
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Document must be less than 10MB");
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          documentUrl: reader.result
        }));
        toast.success("Document uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
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
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!formData.documentUrl) {
      toast.error("Please upload your verification document");
      return;
    }

    if (!formData.location.lat || !formData.location.lng) {
      toast.error("Please detect your base location");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating rescuer account...");

    setTimeout(() => {
      const rescuerData = {
        ...formData,
        role: "rescuer",
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      console.log("Rescuer registered:", rescuerData);

      toast.success("Rescuer account created!", {
        id: loadingToast,
        description: "Your application is under review. We'll notify you soon!",
        duration: 4000,
        action: {
          label: "View Details",
          onClick: () => console.log("Rescuer data", rescuerData)
        }
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500);

      setIsSubmitting(false);
    }, 3000);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
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

            <div className="space-y-2">
              <Label>Verification Document (Required)</Label>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleDocumentUpload}
                className="hidden"
                name="documentUpload"
              />
              <div 
                className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={triggerFileUpload}
              >
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview} alt="document" className="mx-auto max-h-32 rounded object-cover border" />
                    <p className="text-sm text-muted-foreground">Click to change document</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm font-medium">Upload ID/Document</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, PDF (Max 10MB)</p>
                  </div>
                )}
              </div>
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
              
              {/* Map Preview */}
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
              disabled={isSubmitting || !formData.documentUrl || !formData.location.lat}
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