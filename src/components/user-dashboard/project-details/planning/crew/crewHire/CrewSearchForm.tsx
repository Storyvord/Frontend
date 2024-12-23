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
  isPending: boolean;
};

const CrewSearchForm: FC<CrewSearchFormProps> = ({
  formData,
  ifFormValid,
  onSubmit,
  isPending,
}) => {
  const [localFormData, setLocalFormData] = React.useState(formData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(localFormData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[700px] sm:mx-auto mt-8 flex flex-col md:flex-row items-center gap-4"
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
        <Button disabled={isPending} type="submit" className="mx-auto px-8">
          Search
        </Button>
      </form>
      {ifFormValid && (
        <p className="text-center text-red-500 my-2">Please fill at least one field</p>
      )}
    </>
  );
};

export default CrewSearchForm;
