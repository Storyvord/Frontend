"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Logo from "@/assets/app-logo.svg";
import { SelectUserType } from "./components";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import ClientProfileForm from "./components/ClientProfileForm";
import CreateProjectForm from "@/components/user-dashboard/dashboard/CreateProjectForm";
import { useSkipOnBoard } from "@/lib/react-query/queriesAndMutations/onBoard/onBoard";
import StepIndicator from "./components/StepIndicator";
import CrewProfileForm from "./components/CrewProfileForm";
import CrewPortfolio from "./components/CrewPortfolio";

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [userType, stUserType] = useState<number | null>();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { data: userProfile } = useGetUserProfile();
  const { mutateAsync: skipOnBoard } = useSkipOnBoard();

  // change step based on the user stage
  useEffect(() => {
    // user_type === 1  Represents a client
    // user_type === 2  Represents a crew member

    // When the user registers, set userStage to 0
    // After the user selects a userType, set userStage to 1
    // Once the user updates their profile, set userStage to 2
    if (userProfile?.data?.user?.user_stage === "3") {
      if (userProfile?.data?.user?.user_type === 1) {
        router.replace("/dashboard");
      } else {
        router.replace("/crew/home");
      }
      return;
    }
    const userStage = Number(userProfile?.data.user.user_stage);
    setStep(userStage + 1);

    const completedSteps = [];

    // Populate completedSteps based on userStage
    if (userStage >= 1) completedSteps.push(1);
    if (userStage >= 2) completedSteps.push(2);

    // Set state values
    stUserType(userProfile?.data.user.user_type);
    setCompletedSteps(completedSteps);
  }, [userProfile]);

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const nextStep = () => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    setStep(step + 1);
  };

  const onSuccessStep = () => {
    nextStep();
  };

  const handleSkipOnBoard = async () => {
    await skipOnBoard();
    router.replace("/dashboard");
  };

  return (
    <section className="px-2 lg:px-10 md:px-2 py-2 mb-6">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image src={Logo} alt="app-logo" />
      </div>
      <div className="w-full mt-8">
        <div className="flex items-center justify-between mb-6 lg:mb-14 md:mb-14 px-0 lg:px-36 md:px-16">
          <StepIndicator
            stepNumber={1}
            step={step}
            completedSteps={completedSteps}
            label="Select User Type"
          />
          <StepIndicator
            stepNumber={2}
            label="Provide your basic info"
            step={step}
            completedSteps={completedSteps}
          />
          <StepIndicator
            stepNumber={3}
            label={` Create Your ${userType === 1 ? "Project" : "Portfolio"}`}
            step={step}
            completedSteps={completedSteps}
          />
        </div>
        <>
          {step === 1 && <SelectUserType userProfile={userProfile} onSuccessStep={onSuccessStep} />}
          {step === 2 && userType === 1 && (
            <ClientProfileForm prevStep={prevStep} onSuccessStep={onSuccessStep} />
          )}
          {step === 3 && userType === 1 && (
            <CreateProjectForm prevStep={prevStep} handleSkipOnBoard={handleSkipOnBoard} />
          )}

          {step === 2 && userType === 2 && (
            <div className="w-full lg:w-3/5">
              <CrewProfileForm prevStep={prevStep} onSuccessStep={onSuccessStep} />
            </div>
          )}
          {step === 3 && userType === 2 && (
            <CrewPortfolio prevStep={prevStep} handleSkipOnBoard={handleSkipOnBoard} />
          )}
        </>
      </div>
    </section>
  );
};

export default Register;
