import React, { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CrewSearchFormProps = {
  formData: {
    name: string;
    service: string;
    location: string;
  };
  ifFormValid: boolean;
  onSubmit: (formData: { name: string; service: string; location: string }) => void;
};

const CrewSearchForm: FC<CrewSearchFormProps> = ({ formData, ifFormValid, onSubmit }) => {
  const [localFormData, setLocalFormData] = React.useState(formData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(localFormData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:w-[500px] sm:mx-auto mt-8 flex flex-col md:flex-row items-center gap-4"
    >
      <Input
        placeholder="Crew name"
        value={localFormData.name}
        onChange={(e) => setLocalFormData({ ...localFormData, name: e.target.value })}
        className="h-12"
      />
      <Input
        placeholder="Service"
        value={localFormData.service}
        onChange={(e) => setLocalFormData({ ...localFormData, service: e.target.value })}
        className="h-12"
      />
      <Input
        placeholder="Location"
        value={localFormData.location}
        onChange={(e) => setLocalFormData({ ...localFormData, location: e.target.value })}
        className="h-12"
      />
      <Button type="submit" className="mx-auto px-8">
        Search
      </Button>
      {ifFormValid && <p className="text-center text-red-500 my-2">Please fill all the fields</p>}
    </form>
  );
};

export default CrewSearchForm;
