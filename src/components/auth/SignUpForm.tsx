"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import InputField from "@/components/auth/InputField";
import PasswordField from "@/components/auth/PasswordField";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Loader from "@/components/Loader";
import { signUpFormSchema } from "@/lib/validation/auth";
import { useTranslations } from "next-intl";
import TermsAndConditions from "../TermsAndConditions";

interface SignUpFormProps {
  onSubmit: (data: any, isChecked: boolean) => Promise<void>;
  isLoading: boolean;
}

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, isLoading }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const t = useTranslations("Auth.signupSection");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const handleFormSubmit: SubmitHandler<SignUpFormData> = (data) => {
    onSubmit(data, isChecked);
  };

  return (
    <form
      className="w-full max-w-[1000px] mx-auto px-5 py-4 lg:px-24 md:px-8 sm:px-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h3 className="text-3xl leading-[3rem] font-medium text-[#111111] font-poppins md:text-left text-center">
        {t("heading")}
      </h3>
      <p className="text-base font-normal text-[#111111] font-poppins md:text-left text-center">
        {t("paragraph.text")}{" "}
        <Link href="/auth/sign-in" className="underline">
          {t("paragraph.linkText")}
        </Link>
      </p>
      <InputField
        label={t("email")}
        type="text"
        name="email"
        register={register}
        error={errors.email}
      />
      <PasswordField
        label={t("password")}
        name="password"
        register={register}
        error={errors.password}
        showPassword={showPassword}
        toggleShowPassword={() => setShowPassword(!showPassword)}
      />
      <PasswordField
        label={t("confirmPassword")}
        name="confirmPassword"
        register={register}
        error={errors.confirmPassword}
        showPassword={showConfirmPassword}
        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      <div className="flex items-center space-x-3 mt-4">
        <Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
        <button
          onClick={() => setOpenDialog(true)}
          className="font-poppins font-normal text-[#666666] text-sm underline cursor-pointer"
          type="button"
        >
          {t("termsAndConditions")}
        </button>
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : t("button")}
      </Button>
      {/* <OAuthButtons /> */}
      <TermsAndConditions openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </form>
  );
};

export default SignUpForm;
