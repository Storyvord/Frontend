"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { toast } from "@/components/ui/use-toast";
import SignInForm, { SignInFormData } from "@/components/auth/SignInForm";
import { useUserSignIn } from "@/lib/react-query/queriesAndMutations/auth/auth";
import SideBanner from "@/components/auth/SideBanner";
import { formatError } from "@/lib/utils";

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutateAsync: loginUser } = useUserSignIn();

  const handleLogin = async (data: SignInFormData) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);

      if (!res || !res.data || !res.data.user) {
        throw new Error("User data not found");
      }

      // user_type === 1  Represents a client
      // user_type === 2  Represents a crew member

      // When the user registers, set userStage to 0
      // After the user selects a userType, set userStage to 1
      // Once the user updates their profile, set userStage to 2

      // Handle userType and steps based on the response
      const user = res?.data?.user;

      if (user.user_type === 1 && user.steps) {
        router.replace("/dashboard");
        Cookies.set("isClient", "true");
      } else if (user.user_type === 2 && user.steps) {
        router.replace("/crew/home");
        Cookies.set("isClient", "false");
      } else if (!user.steps) {
        router.replace("/auth/onboard");
      } else {
        throw new Error("Unexpected user state");
      }
    } catch (error) {
      const { title, description } = formatError(error);
      toast({
        title,
        description,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex md:h-screen h-full justify-start">
      <SideBanner />
      <div className="md:w-6/12 md:h-screen h-full w-full flex items-center justify-center">
        <SignInForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default SignInPage;
