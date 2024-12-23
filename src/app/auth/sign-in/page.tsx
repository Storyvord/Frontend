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

      if (res) {
        // user_type === 1  Represents a client
        // user_type === 2  Represents a crew member

        // When the user registers, set userStage to 0
        // After the user selects a userType, set userStage to 1
        // Once the user updates their profile, set userStage to 2

        const { user_type, steps } = res?.data?.user;
        if (user_type === 1 && steps) {
          Cookies.set("isClient", "true");
          router.push("/dashboard");
        } else if (user_type === 2 && steps) {
          Cookies.set("isClient", "false");
          router.push("/crew/home");
        } else if (!steps) {
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
    <section className="flex md:h-screen h-full justify-between pt-20 md:pt-0">
      <SideBanner />
      <div className="md:w-6/12 md:h-screen h-full w-full flex items-center justify-center">
        <SignInForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default SignInPage;
