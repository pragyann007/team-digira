import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Smartphone, ArrowLeft } from "lucide-react";
import { path } from "../../serverPath"; // ✅ your backend base URL

export function OTPForm({ className, ...props }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [userEmail, setUserEmail] = useState("user@streetsathi.com");
  const inputsRef = useRef([]);

  // 🔹 Fetch email from localStorage
  useEffect(() => {
    inputsRef.current[0]?.focus();
    const email =
      localStorage.getItem("pendingVerificationEmail") ||
      "user@streetsathi.com";
    setUserEmail(email);
  }, []);

  // 🔹 Countdown for resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // 🔹 Handle OTP input
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) inputsRef.current[index + 1]?.focus();

    const otpString = newOtp.join("");
    if (otpString.length === 4) handleVerify(otpString);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputsRef.current[index - 1]?.focus();
  };

  // 🔹 Paste full OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) newOtp[i] = pastedData[i];
    setOtp(newOtp);
    if (pastedData.length === 4) handleVerify(pastedData);
  };

  // 🔹 Verify OTP with backend
  const handleVerify = async (otpToVerify = otp.join("")) => {
    if (otpToVerify.length !== 4) {
      toast.error("Please enter complete OTP");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const res = await axios.post(`${path}/api/auth/otp`, {
        email: userEmail,
        otp: otpToVerify,
      });

      toast.success("OTP Verified Successfully!", {
        id: loadingToast,
        description:
          res.data?.message ||
          "Your account is now verified. Redirecting to login...",
        duration: 3000,
      });

      localStorage.removeItem("pendingVerificationEmail");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again.",
        { id: loadingToast }
      );
      setOtp(["", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Resend OTP
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    try {
      await axios.post(`${path}/api/auth/resend-otp`, { email: userEmail });
      toast.success("New OTP Sent", {
        description: `A new code has been sent to ${userEmail}`,
        duration: 3000,
      });
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  // 🔹 Back button
  const handleBack = () => navigate(-1);

  return (
    <div className={className} {...props}>
      <Button variant="ghost" size="sm" className="mb-4 -ml-2" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 rounded-full p-3">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl">Enter 4-Digit Code</CardTitle>
          <CardDescription>
            We sent a code to <br />
            <strong className="text-foreground">{userEmail}</strong>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp" className="text-center block">
              Enter OTP
            </Label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste} id="otp">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-xl font-bold"
                  disabled={loading}
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => handleVerify()}
              disabled={loading || otp.join("").length !== 4}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={handleResend}
                disabled={resendTimer > 0 || loading}
                className="text-primary hover:underline"
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground mt-4">
        Having trouble?{" "}
        <a href="#" className="text-primary hover:underline">
          Get help
        </a>
      </p>
    </div>
  );
}
