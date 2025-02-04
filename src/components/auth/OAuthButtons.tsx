import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "@/assets/google.svg";
import AppleIcon from "@/assets/apple.svg";

const OAuthButtons = () => (
  <>
    <div className="relative my-10">
      <div className="border border-[#66666659] w-full h-0" />
      <p className="absolute bg-white px-2 text-xl font-normal text-[#666666] font-poppins left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        OR
      </p>
    </div>
    <Button className="w-full cursor-not-allowed" disabled variant="iconButton">
      <Image className="mr-2 h-6 w-6" src={GoogleIcon} alt="google-icon" />
      Log in with Google
    </Button>
    <Button className="mt-5 w-full cursor-not-allowed" disabled variant="iconButton">
      <Image className="mr-2 h-6 w-6" src={AppleIcon} alt="apple-icon" />
      Continue with Apple
    </Button>
  </>
);

export default OAuthButtons;
