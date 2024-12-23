"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetInvitations } from "@/lib/react-query/queriesAndMutations/crew/invitations";
import { useRouter } from "next/navigation";
import React from "react";
import { Project } from "../projects/page";
import Loader from "@/components/Loader";

const FileDocument = () => {
  const { data: listOfProjects, isPending } = useGetInvitations();
  const router = useRouter();

  return (
    <div>
      <h1 className=" text-center font-poppins-semibold text-xl text-gray-700">FileDocument</h1>
      {isPending && (
        <div className="w-full grid place-items-center mt-8">
          <Loader />
        </div>
      )}
      {listOfProjects?.data?.length === 0 && (
        <p className=" text-center text-gray-600 mt-4">You are not on boarder in any project</p>
      )}
      <section className=" mt-4">
        {listOfProjects?.data?.map((item: Project) => (
          <Card
            onClick={() => router.push(`/crew/file-documents/${item.project_id}`)}
            key={item.id}
            className=" cursor-pointer mb-4 mx-auto max-w-4xl"
          >
            <CardTitle className="text-xl"> {item.project_name}</CardTitle>
            <p className=" text-sm text-gray-400">
              Created At: {new Date(item.created_at).toLocaleString()}
            </p>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default FileDocument;
