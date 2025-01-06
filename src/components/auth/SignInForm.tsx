"use client";
import React from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import InputField from "@/components/auth/InputField";
import PasswordField from "@/components/auth/PasswordField";
import OAuthButtons from "@/components/auth/OAuthButtons";
import { signinFormSchema } from "@/lib/validation/auth";
import { useTranslations } from "next-intl";
import Image from "next/image";

export type SignInFormData = {
  email: string;
  password: string;
};

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => Promise<void>;
  isLoading: boolean;
};

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, isLoading }) => {
  const t = useTranslations("Auth.loginSection");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<SignInFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      className="w-full max-w-[1000px] mx-auto px-5 py-4 lg:px-24 md:px-8 sm:px-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={135} height={100} className="md:hidden " />
      </Link>
      <h3 className=" text-2xl lg:text-3xl leading-[3rem] font-medium text-[#111111] font-poppins text-left mt-10 md:mt-0 ">
        {t("heading")}
      </h3>
      <p className="text-base font-normal text-[#111111] font-poppins text-left mt-2 mb-14 md:mb-4 ">
        {t("paragraph.text")} {""}
        <Link href="/auth/sign-up" className="underline">
          {t("paragraph.linkText")}
        </Link>
      </p>
      <InputField
        label={t("email")}
        type="email"
        name="email"
        register={register}
        error={errors.email}
      />
      <PasswordField
        label={t("password")}
        name="password"
        register={register}
        error={errors.password}
      />
      <div className="mt-2 text-right">
        <Link
          // href="/auth/forget-password"
          href="#"
          className="underline text-base font-normal text-[#111111] font-poppins"
        >
          {t("forgotPassword")}
        </Link>
      </div>
      <Button className="mt-6 w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : t("button")}
      </Button>
      {/* <OAuthButtons /> */}
    </form>
  );
};

export default SignInForm;
