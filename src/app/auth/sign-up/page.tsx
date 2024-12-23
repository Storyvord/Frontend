"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import SignUpForm from "@/components/auth/SignUpForm";
import { useRegisterUser } from "@/lib/react-query/queriesAndMutations/auth/auth";
import SideBanner from "@/components/auth/SideBanner";
import { formatError } from "@/lib/utils";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { mutateAsync: registerUser } = useRegisterUser();
  const handleSignUp = async (data: any, isChecked: boolean) => {
    if (!isChecked) {
      toast({
        title: "You must agree to Terms of use and Privacy Policy",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      const res = await registerUser({ ...data, agreePolicy: isChecked });
      if (res) {
        toast({
          title: `${res?.message}, Verification Link sent to your Email, Please Verify Your Email`,
        });
        router.push("/auth/sign-in");
      }
    } catch (error: unknown) {
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
    <section className="flex md:h-screen h-full justify-between pt-10 md:pt-0">
      <SideBanner />
      <div className="md:w-6/12 md:h-screen h-full w-full flex items-center justify-center">
        <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default SignUpPage;
