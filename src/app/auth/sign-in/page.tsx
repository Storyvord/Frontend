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
      console.log(res);
      if (res) {
        // user_type === 1  Represents a client
        // user_type === 2  Represents a crew member

        // When the user registers, set userStage to 0
        // After the user selects a userType, set userStage to 1
        // Once the user updates their profile, set userStage to 2

        if (res?.data?.user.user_type === 1 && res?.data?.user.steps) {
          Cookies.set("isClient", "true");
          router.push("/dashboard");
        } else if (res?.data?.user.user_type === 2 && res?.data?.user.steps) {
          Cookies.set("isClient", "false");
          router.push("/crew/home");
        } else if (!res?.data?.user.steps) {
          router.push("/auth/onboard");
        }
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
