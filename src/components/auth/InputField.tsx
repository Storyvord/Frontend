import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = ({ label, name, type, register, error }: any) => (
  <div className="mt-6">
    <Label className="font-poppins font-normal text-[#666666] text-base">{label}</Label>
    <Input
      type={type}
      {...register(name, { required: `${label} is required` })}
      className="mt-1 text-base font-normal text-[#111111] font-poppins h-10 md:h-12 rounded-xl border-[#66666659]"
    />
    {error && <span className="text-red-500 font-poppins text-sm">{error.message}</span>}
  </div>
);

export default InputField;
