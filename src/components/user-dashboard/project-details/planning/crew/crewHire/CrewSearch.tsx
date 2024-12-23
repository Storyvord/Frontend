"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { formatError } from "@/lib/utils";
import { useSearchCrew, useSentInvitationToCrew } from "@/lib/react-query/queriesAndMutations/crew";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";
import CrewProfileCard from "./CrewProfileCard";
import CrewSearchForm from "./CrewSearchForm";

type FormData = {
  name: string;
  service: string;
  location: string;
};

const CrewSearch: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    service: "",
    location: "",
  });
  const [ifFormValid, setIfFormValid] = useState(false);
  const [searchResults, setSearchResults] = useState<[] | null>(null);

  const { id: projectId }: { id: string } = useParams();
  const { toast } = useToast();

  const { mutateAsync, isPending } = useSearchCrew();
  const { mutateAsync: sendInvitation, isPending: isPendingSendInvitation } =
    useSentInvitationToCrew();

  const handleSearch = async (formValues: FormData) => {
    if (formValues.name || formValues.service || formValues.location) {
      setIfFormValid(false); // Mark the form as valid
      setFormData(formValues);
      try {
        const data = await mutateAsync(formValues);
        setSearchResults(data?.data);
      } catch (error) {
        const { title, description } = formatError(error);
        toast({
          title,
          description,
          variant: "destructive",
        });
      }
    } else {
      setIfFormValid(true); // Mark the form as invalid
    }
  };

  const handleSendInvitation = async (userId: number) => {
    try {
      await sendInvitation({ projectId, userId });
      toast({
        title: "Invitation sent successfully",
        description: "Invitation has been sent to the crew",
      });
    } catch (error) {
      const { title, description } = formatError(error);
      toast({
        title,
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl lg:text-2xl font-semibold text-center">
        Discover the world’s top creators
      </h1>
      <CrewSearchForm
        onSubmit={handleSearch}
        ifFormValid={ifFormValid}
        formData={formData}
        isPending={isPending}
      />
      {isPending && (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      )}

      <>
        {searchResults && <h1 className="my-4 text-lg md:text-xl">Search Results</h1>}
        {searchResults?.length === 0 && (
          <h1 className="lg:mt-24 mt-16 text-lg md:text-xl text-center">
            No results found for the search
          </h1>
        )}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {searchResults?.map((item: any) => (
            <CrewProfileCard
              key={item.id}
              id={item.user.id}
              profileImageUrl={item.image}
              name={item.personal_info?.full_name || "Anonymous"}
              location={item.personal_info?.location || "Unknown"}
              description={item.personal_info?.bio || "No bio available"}
              rate={item.standardRate || "N/A"}
              handleSendInvitation={handleSendInvitation}
            />
          ))}
        </section>
      </>
    </div>
  );
};

export default CrewSearch;
