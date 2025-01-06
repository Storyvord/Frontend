"use client";
import { useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import ShowIcon from "@/assets/show.svg";
import HideIcon from "@/assets/hide-eye.svg";
import { Label } from "@/components/ui/label";

const PasswordField = ({ label, name, register, error }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-6">
      <Label className="font-poppins font-normal text-[#666666] text-base">{label}</Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          {...register(name, { required: `${label} is required` })}
          className="mt-1 text-base font-normal text-[#111111] font-poppins h-10 md:h-12 rounded-xl border-[#66666659]"
        />
        {error && <span className="text-red-500 font-poppins text-sm">{error.message}</span>}
        <div
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          <Image src={showPassword ? ShowIcon : HideIcon} alt="eye-password" />
        </div>
      </div>
    </div>
  );
};

export default PasswordField;
