import { useMemo } from "react";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";

interface CrewMember {
  membership_id: string;
  user: { personal_info: { full_name: string } };
}

interface CrewOption {
  value: number;
  label: string;
}

export const useCrewOptions = (projectId: string) => {
  const {
    data: crewListData,
    isPending: isCrewLoading,
    isError: isCrewError,
  } = useGetCrewList(projectId);

  const crewList = useMemo<CrewOption[]>(() => {
    return crewListData?.data?.map((crew: CrewMember) => ({
      value: crew.membership_id,
      label: crew.user.personal_info.full_name,
    }));
  }, [crewListData]);

  return { crewList, isCrewLoading, isCrewError };
};
