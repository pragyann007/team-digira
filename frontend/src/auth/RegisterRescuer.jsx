import React from "react";
import { RescuerSignupForm } from "@/components/RescuerSignupForm";

const RegisterRescuer = () => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <span className="text-xs font-bold">SS</span>
          </div>
          Street साथी
        </a>
        <RescuerSignupForm />
      </div>
    </div>
  );
};

export default RegisterRescuer;